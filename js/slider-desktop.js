const track = document.querySelector(".slider-track");
const thumb = document.getElementById("slider-thumb");
const separator = document.querySelector(".slider-separator");

let isSliderDragging = false;
let position = 0;

const sliderGoodWrapper = document.querySelector(".slider-good-wrapper");
const sliderBadWrapper = document.querySelector(".slider-bad-wrapper");

const sliderGoodTitle = document.querySelector(".slider-good-title");
const sliderBadTitle = document.querySelector(".slider-bad-title");

const separatorWidth = separator.getBoundingClientRect().width;

// initial position is 50% of the track width
const initialPosition = track.offsetWidth / 2;
thumb.style.left = `${initialPosition}px`;
sliderGoodWrapper.style.clipPath = `inset(0 ${track.offsetWidth - initialPosition - separatorWidth / 2}px 0 0)`;
sliderGoodTitle.style.clipPath = `inset(0 ${track.offsetWidth - initialPosition - separatorWidth / 2}px 0 0)`;
sliderBadWrapper.style.clipPath = `inset(0 0 0 ${initialPosition + separatorWidth / 2}px)`;
sliderBadTitle.style.clipPath = `inset(0 0 0 ${initialPosition + separatorWidth / 2}px)`;
separator.style.left = `${initialPosition - separatorWidth / 2}px`;


thumb.addEventListener("mousedown", (e) => {
	isSliderDragging = true;
	e.preventDefault();
	position = e.clientX - thumb.offsetLeft;
	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("mouseup", onMouseUp);
});

thumb.addEventListener("touchstart", (e) => {
	isSliderDragging = true;
	e.preventDefault();
	position = e.touches[0].clientX - thumb.offsetLeft;
	document.addEventListener("touchmove", onMouseMove);
	document.addEventListener("touchend", onMouseUp);
});


const onMouseMove = (e) => {
	if (!isSliderDragging) return;
	let newPosition = e.clientX - position;
	const trackRect = track.getBoundingClientRect();
	const minPosition = 0;
	const maxPosition = trackRect.width;

	if (newPosition < minPosition) newPosition = minPosition;
	if (newPosition > maxPosition) newPosition = maxPosition;
	
	thumb.style.left = `${newPosition}px`;
	sliderGoodWrapper.style.clipPath = `inset(0 ${track.offsetWidth - newPosition - separatorWidth / 2}px 0 0)`;
	sliderGoodTitle.style.clipPath = `inset(0 ${track.offsetWidth - newPosition - separatorWidth / 2}px 0 0)`;
	
	sliderBadTitle.style.clipPath = `inset(0 0 0 ${newPosition + separatorWidth / 2}px)`;
	sliderBadWrapper.style.clipPath = `inset(0 0 0 ${newPosition + separatorWidth / 2}px)`;
	separator.style.left = `${newPosition - separatorWidth / 2}px`;
};

const onMouseUp = () => {
	isSliderDragging = false;
	document.removeEventListener("mousemove", onMouseMove);
	document.removeEventListener("mouseup", onMouseUp);
	
	document.removeEventListener("touchmove", onMouseMove);
	document.removeEventListener("touchend", onMouseUp);
};