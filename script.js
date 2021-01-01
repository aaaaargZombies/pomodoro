let circ = document.getElementsByClassName("progress-ring__circle")[0];
let timerBtn = document.getElementsByClassName("timer__btn")[0];

const setProgress = (el, percent = 0) => {
	el.style.strokeDasharray = 1;
	el.style.strokeDashoffset = 1 - percent;
};

const startPause = () => {
	circ.style.animationPlayState === "paused"
		? (circ.style.animationPlayState = "")
		: (circ.style.animationPlayState = "paused");
};

// setProgress(circ, (17 * 60 + 59) / (25 * 60));

circ.addEventListener("animationend", () => {
	console.log("💥BOOOOM!💥");
});

// TODO
timerBtn.onclick = startPause;
circ.onclick = startPause;
