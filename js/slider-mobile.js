const separator = document.querySelector(".slider-separator");
const separatorHeight = separator.getBoundingClientRect().height;

const sliderContent = document.querySelector(".slider-content");

const sliderGoodWrapper = document.querySelector(".slider-good-wrapper");
const sliderBadWrapper = document.querySelector(".slider-bad-wrapper");

document.querySelectorAll('.slider-grid-item:nth-child(n+19)').forEach(el => el.remove());

const moveSeparator = () => {
	const sliderRect = sliderContent.getBoundingClientRect();
	const leftToTop = sliderRect.top + separatorHeight / 2;
	const leftToTarget = sliderRect.top + sliderRect.height - separatorHeight / 2;
	
	if (window.innerHeight / 2 - leftToTarget > 0) {
		separator.style.position = "absolute";
		separator.style.top = `calc(100% - ${separator.getBoundingClientRect().height}px)`;
	} else if (window.innerHeight / 2 - leftToTop > 0) {
		separator.style.position = "fixed";
		separator.style.top = `${window.innerHeight / 2 - separator.getBoundingClientRect().height / 2}px`;
	} else {
		separator.style.position = "absolute";
		separator.style.top = "0";
	}
	
	const offset = separator.getBoundingClientRect().top - sliderRect.top;
	sliderGoodWrapper.style.clipPath = `inset(0 0 calc(100% - ${offset + separatorHeight / 2}px) 0)`;
	sliderBadWrapper.style.clipPath = `inset(${offset + separatorHeight / 2}px 0 0 0)`;
}

window.addEventListener("scroll", moveSeparator);
window.addEventListener("resize", moveSeparator);