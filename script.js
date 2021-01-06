let circ = document.getElementsByClassName("progress-ring__circle")[0];
let timerBtn = document.getElementsByClassName("timer__btn")[0];
let modal = document.getElementsByClassName("modal")[0];
let closeBtn = document.getElementsByClassName("modal__cancel")[0];
let settingsBtn = document.getElementsByClassName("settings")[0];
let form = document.getElementsByClassName("modal__form")[0];

const setProgress = (el, percent = 0) => {
	el.style.strokeDasharray = 1;
	el.style.strokeDashoffset = 1 - percent;
};

const startPause = () => {
	if (circ.style.animationPlayState === "paused") {
		circ.style.animationPlayState = "";
		timerBtn.textContent = "pause";
	} else {
		circ.style.animationPlayState = "paused";
		timerBtn.textContent = "start";
	}
};

const closeModal = e => {
	e.preventDefault();
	modal.style.display = "none";
};

const openModal = e => {
	e.preventDefault();
	modal.style.display = "flex";
};

circ.addEventListener("animationend", () => {
	console.log("💥BOOOOM!💥");
});

timerBtn.onclick = startPause;
circ.onclick = startPause;

settingsBtn.onclick = openModal;
// modal.onclick = closeModal;
closeBtn.onclick = closeModal;

timerBtn.click();

form.onsubmit = e => {
	e.preventDefault();
	// console.log(e);
	let [pomodoro, shortBreak, longBreak, font, color] = [...e.target.elements]
		.filter(e => e.value)
		.filter(e => e.type !== "radio" || e.checked)
		.map(e => {
			if (e.type === "number") return parseInt(e.value);
			return e.id;
		});
	let settings = { pomodoro, shortBreak, longBreak, font, color };
	console.log(settings);
};
