if (window.innerWidth > 779) {
	// add slider-desktop.js to the page
	const script = document.createElement("script");
	script.src = "js/slider-desktop.js";
	document.body.appendChild(script);
} else {
	const script = document.createElement("script");
	script.src = "js/slider-mobile.js";
	document.body.appendChild(script);
}