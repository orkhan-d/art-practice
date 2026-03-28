const rotatorElement = document.querySelector('.glasses-rotator');
const valueDisplay = document.querySelector('#glasses-rotator-value');
let isDragging = false;

const glassesOverlay = document.querySelector('.glasses-overlay');

const mouseDown = (e) => {
	e.preventDefault();
	isDragging = true;
	updateRotation(e);
}

const mouseMove = (e) => {
	if (!isDragging) return;
	e.preventDefault();
	updateRotation(e);
}

const mouseUp = () => {
	isDragging = false;
}

let lastPercentage = 0;

function updateRotation(e) {
	if (!isDragging) return;
	
	const rect = rotatorElement.getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;
	
	const dx = e.clientX - centerX;
	const dy = e.clientY - centerY;
	
	// [-180, 180]
	let angle = Math.atan2(dy, dx) * (180 / Math.PI);
	
	// normalize to [0, 360)
	if (angle < 0) angle += 360;
	
	const totalArc = 215; // 145→360 + 0→45
	let percentage;
	
	if (angle >= 145 && angle <= 360) {
		percentage = ((angle - 145) / totalArc) * 100;
	} else if (angle >= 0 && angle <= 45) {
		percentage = (((360 - 145) + angle) / totalArc) * 100;
	} else {
		return; // ignore bottom 90°
	}
	
	percentage = Math.max(0, Math.min(percentage, 100));
	
	// Limit how much it can change per frame (±5% per move)
	const maxStep = 5;
	const diff = percentage - lastPercentage;
	if (Math.abs(diff) > maxStep) {
		percentage = lastPercentage + (diff > 0 ? maxStep : -maxStep);
		percentage = Math.max(0, Math.min(percentage, 100));
	}
	
	lastPercentage = percentage;
	
	const rotation = (percentage / 100) * 270;
	rotatorElement.style.transform = `rotate(${rotation}deg)`;
	valueDisplay.textContent = `${Math.round(percentage)}%`;
	
	// change overlay opacity based on percentage
	glassesOverlay.style.opacity = percentage / 100 * 0.9;
}

// Event Listeners
rotatorElement.addEventListener('mousedown', mouseDown);
rotatorElement.addEventListener('mousemove', mouseMove);
rotatorElement.addEventListener('mouseup', mouseUp);

// add touch support
rotatorElement.addEventListener('touchstart', (e) => {
	e.preventDefault();
	isDragging = true;
	updateRotation(e.touches[0]);
});

rotatorElement.addEventListener('touchmove', (e) => {
	if (!isDragging) return;
	e.preventDefault();
	updateRotation(e.touches[0]);
});

rotatorElement.addEventListener('touchend', () => {
	isDragging = false;
});