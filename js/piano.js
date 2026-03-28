const pianoDisplay = document.querySelector(".piano-display-value");
const pianoKeys = document.querySelectorAll(".piano-key");

pianoKeys.forEach((key) => {
	key.addEventListener("click", (e) => {
		console.log(key);
		e.preventDefault();
		e.stopPropagation();
		const note = key.getAttribute("data-note");
		
		if (pianoDisplay.textContent.length < 4) {
			pianoDisplay.textContent = pianoDisplay.textContent.trim() + note;
			// playNote(note);
		} else {
			// TODO: find another sound
		}
	});
});

function playNote(note) {
	// add note to display
	// TODO: change to valid audio file path
	// const audio = new Audio(`assets/sounds/${note}.mp3`);
	const audio = new Audio(`assets/sounds/1.mp3`);
	audio.play();
}