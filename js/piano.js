const pianoDisplay = document.querySelector(".piano-display-value");
const pianoKeys = document.querySelectorAll(".piano-key");

pianoKeys.forEach((key) => {
	key.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		const note = key.getAttribute("data-note");
		
		if (pianoDisplay.textContent.length < 4) {
			// getting piano key own text
			const text = [...key.childNodes].filter(node => node.nodeType === Node.TEXT_NODE)[0].textContent
			pianoDisplay.textContent = pianoDisplay.textContent.trim() + text.trim();
			playNote(note);
		} else {
			// TODO: find another sound
		}
	});
});

function playNote(note) {
	const audio = new Audio(`assets/sounds/${note}.mp3`);
	audio.play();
}