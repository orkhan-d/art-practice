const socialElevatorProfileName = document.querySelector(".social-elevator-profile-name.actual");

// observe the parent of the text node, not the text node itself
const parentObserver = new MutationObserver(() => {
    socialElevatorProfileName.textContent = pianoDisplay.textContent;
});

parentObserver.observe(pianoDisplay, {
    childList: true,
    subtree: true
});


const elevator = document.querySelector(".social-elevator");
const profile = document.querySelector(".social-elevator-profile");
const target = document.querySelector(".social-elevator-target");

const profileNonTargetElements = document.querySelectorAll(".social-elevator-profile-wrapper :not(.target)");
const profileTargetElements = document.querySelectorAll(".social-elevator-profile-wrapper .target");

const elevatorLevelCards = document.querySelectorAll(".social-elevator-level-info-card");

const moveElevator = () => {
    const leftToTop = elevator.getBoundingClientRect().top + profile.getBoundingClientRect().height / 2;
    const leftToTarget = target.getBoundingClientRect().top + profile.getBoundingClientRect().height / 2;
    
    // check if user is at the bottom of the page
    const offsetFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    if (offsetFromBottom < 100 && window.innerWidth <= 900) {
        profile.style.top = `80%`;
        profile.style.transition = `left 0.3s linear, top 1s ease-out`;
        return;
    }
    
    if (leftToTarget < window.innerHeight / 2) {
        profile.style.position = "fixed";
        profile.style.top = `${window.innerHeight / 2 - profile.getBoundingClientRect().height / 2}px`;
        
        if (window.innerWidth <= 900) {
            profile.style.setProperty("--social-elevator-profile-left", `${target.getBoundingClientRect().left + target.getBoundingClientRect().width / 2 - profile.getBoundingClientRect().width / 2}px`);
        }
    } else if (window.innerHeight / 2 - leftToTarget > 0) {
        profile.style.position = "absolute";
        profile.style.top = `calc(100% - ${profile.getBoundingClientRect().height}px)`;
        // remove property to reset left
        if (window.innerWidth <= 900) {
            profile.style.removeProperty("--social-elevator-profile-left");
        }
        profile.style.transition = `left 0.3s linear`;
    } else if (window.innerHeight / 2 - leftToTop > 0) {
        profile.style.position = "fixed";
        profile.style.top = `${window.innerHeight / 2 - profile.getBoundingClientRect().height / 2}px`;
        
        if (window.innerWidth <= 900) {
        profile.style.removeProperty("--social-elevator-profile-left");
            profile.style.transition = `left 0.3s linear`;
        }
    } else {
        profile.style.position = "absolute";
        profile.style.top = "0";
        profile.style.transition = `left 0.3s linear`;
    }
    
    const offsetPercent = (profile.getBoundingClientRect().top - elevator.getBoundingClientRect().top) / (target.getBoundingClientRect().top - elevator.getBoundingClientRect().top);
    const offsetPercentClamped = Math.max(0, Math.min(1, offsetPercent));
    
    const newShakeDeltaPx = (8 * offsetPercentClamped);
    profile.style.setProperty("--shake-delta-px", `${newShakeDeltaPx}px`);
    
    profileNonTargetElements.forEach(el => {
        el.style.opacity = 1 - offsetPercentClamped;
    });
    profileTargetElements.forEach(el => {
        el.style.opacity = offsetPercentClamped;
    });
}

const changeCardOpacity = () => {
    const profileRect = profile.getBoundingClientRect();
    const maxDistance = window.innerHeight / 2 * 9 / 10;
    
    elevatorLevelCards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const distance = profileRect.top + profileRect.height / 2 - (cardRect.top + cardRect.height / 2);
        
        
        if (distance > 0) {
            card.style.opacity = 1;
        } else if (-distance < maxDistance / 10) {
            card.style.opacity = 1;
        } else {
            card.style.opacity = Math.max(0, 1 - -distance / maxDistance);
        }
    });
}

window.addEventListener("scroll", moveElevator);
window.addEventListener("resize", moveElevator);

window.addEventListener("scroll", changeCardOpacity);
window.addEventListener("resize", changeCardOpacity);