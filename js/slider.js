const track = document.querySelector(".slider-track");
const thumb = document.getElementById("slider-thumb");
const separator = document.querySelector(".slider-separator");

let isSliderDragging = false;
let position = 0;

const sliderGoodWrapper = document.querySelector(".slider-good-wrapper");
const sliderBadWrapper = document.querySelector(".slider-bad-wrapper");

// initial position is 50% of the track width
const initialPosition = track.offsetWidth / 2;
thumb.style.left = `${initialPosition}px`;
sliderGoodWrapper.style.clipPath = `inset(0 ${track.offsetWidth-initialPosition}px 0 0)`;
sliderBadWrapper.style.clipPath = `inset(0 0 0 ${initialPosition}px)`;
separator.style.left = `${initialPosition}px`;

const separatorWidth = separator.getBoundingClientRect().width;


thumb.addEventListener("mousedown", (e) => {
	isSliderDragging = true;
	e.preventDefault();
	position = e.clientX - thumb.offsetLeft;
	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("mouseup", onMouseUp);
});


const onMouseMove = (e) => {
	if (!isSliderDragging) return;
	let newPosition = e.clientX - position;
	const trackRect = track.getBoundingClientRect();
	const minPosition = 0;
	const maxPosition = trackRect.width;

	if (newPosition < minPosition) newPosition = minPosition;
	if (newPosition > maxPosition) newPosition = maxPosition;
	
	console.log(newPosition);

	thumb.style.left = `${newPosition}px`;
	sliderGoodWrapper.style.clipPath = `inset(0 ${track.offsetWidth-newPosition + separatorWidth/2}px 0 0)`;
	sliderBadWrapper.style.clipPath = `inset(0 0 0 ${newPosition + separatorWidth/2}px)`;
	separator.style.left = `${newPosition}px`;
};

const onMouseUp = () => {
	isSliderDragging = false;
	document.removeEventListener("mousemove", onMouseMove);
	document.removeEventListener("mouseup", onMouseUp);
};