const ct = document.querySelector(".container");
let animationFrame;
let easingActive = false;
const easeOutQuad = (t) => t * (2 - t);
const animateEasing = (startX, startY, endX, endY, duration) => {
	const startTime = performance.now();
	const animate = (time) => {
		const progress = Math.min((time - startTime) / duration, 1);
		const easedProgress = easeOutQuad(progress);
		const currentX = startX + (endX - startX) * easedProgress;
		const currentY = startY + (endY - startY) * easedProgress;
		ct.style.setProperty("--xv", currentX);
		ct.style.setProperty("--yv", currentY);
		if (progress < 1) {
			animationFrame = requestAnimationFrame(animate);
		}

		else {
			easingActive = false;
		}
	};
	easingActive = true;
	cancelAnimationFrame(animationFrame);
	animationFrame = requestAnimationFrame(animate);
};

ct.addEventListener("mousemove", function (e) {
	if (easingActive) return;
	const rect = ct.getBoundingClientRect();
	const se = 42;
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	const rotateX = (y / rect.height - 0.5) * se;
	const rotateY = (x / rect.width - 0.5) * se;
	const currentX = parseFloat(getComputedStyle(ct).getPropertyValue("--xv")) || 0;
	const currentY = parseFloat(getComputedStyle(ct).getPropertyValue("--yv")) || 0;
	animateEasing(currentX, currentY, rotateX, rotateY, 100);
});

ct.addEventListener("mouseleave", () => {
	const currentX = parseFloat(getComputedStyle(ct).getPropertyValue("--xv")) || 0;
	const currentY = parseFloat(getComputedStyle(ct).getPropertyValue("--yv")) || 0;
	animateEasing(currentX, currentY, 0, 0, 200);
});
