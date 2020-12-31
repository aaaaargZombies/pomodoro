let circ = document.getElementsByClassName("progress-ring__circle")[0];

const setProgress = (el, percent = 0) => {
	el.style.strokeDasharray = 1;
	el.style.strokeDashoffset = 1 - percent;
};

// setProgress(circ, (17 * 60 + 59) / (25 * 60));
