const socialElevatorProfileName = document.querySelector(".social-elevator-profile-name");

// observe the parent of the text node, not the text node itself
const parentObserver = new MutationObserver(() => {
    socialElevatorProfileName.textContent = pianoDisplay.textContent;
});

parentObserver.observe(pianoDisplay, {
    childList: true,      // catches when inner text nodes change
    subtree: true         // optional, but helps with nested changes
});


const elevator = document.querySelector(".social-elevator");
const profile = document.querySelector(".social-elevator-profile");
const target = document.querySelector(".social-elevator-target");

const elevatorLevelCards = document.querySelectorAll(".social-elevator-level-info-card");

const moveElevator = () => {
    const leftToTop = elevator.getBoundingClientRect().top + profile.getBoundingClientRect().height / 2;
    const leftToTarget = target.getBoundingClientRect().top + profile.getBoundingClientRect().height / 2;
    
    if (window.innerHeight / 2 - leftToTarget > 0) {
        profile.style.position = "absolute";
        profile.style.top = `calc(100% - ${profile.getBoundingClientRect().height}px)`;
    } else
    if (window.innerHeight / 2 - leftToTop > 0) {
        profile.style.position = "fixed";
        profile.style.top = `${window.innerHeight / 2 - profile.getBoundingClientRect().height / 2}px`;
    } else {
        profile.style.position = "absolute";
        profile.style.top = "0";
    }
}

const changeCardOpacity = () => {
    const profileRect = profile.getBoundingClientRect();
    const maxDistance = window.innerHeight / 2 * 9 / 10;
    
    elevatorLevelCards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const distance = profileRect.top + profileRect.height / 2 - (cardRect.top + cardRect.height / 2);
        
        
        if (distance > 0) {
            card.style.opacity = 1;
            return;
        } else if (-distance < maxDistance / 10) {
            card.style.opacity = 1;
        } else {
            // change based on distance, but cap it at 0
            card.style.opacity = Math.max(0, 1 - -distance / maxDistance);
        }
    });
}

window.addEventListener("scroll", moveElevator);
window.addEventListener("resize", moveElevator);

window.addEventListener("scroll", changeCardOpacity);
window.addEventListener("resize", changeCardOpacity);