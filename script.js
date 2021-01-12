let state = {
	phase: 0,
	timeRemain: 1500,
	paused: true,
	settings: {
		font: "open",
		color: "primary",
		pomodoro: 1500,
		shortBreak: 300,
		longBreak: 900
	}
};

const phases = [
	"pomodoro",
	"shortBreak",
	"pomodoro",
	"shortBreak",
	"pomodoro",
	"shortBreak",
	"pomodoro",
	"longBreak"
];

let circ = document.getElementsByClassName("progress-ring__circle")[0];
let timerBtn = document.getElementsByClassName("timer__btn")[0];
let modal = document.getElementsByClassName("modal")[0];
let closeBtn = document.getElementsByClassName("modal__cancel")[0];
let settingsBtn = document.getElementsByClassName("settings")[0];
let form = document.getElementsByClassName("modal__form")[0];
let timeInputs = document.getElementsByClassName("time__input");
let timeUpBtns = document.getElementsByClassName("time__up");
let timeDownBtns = document.getElementsByClassName("time__down");
let root = document.documentElement;

const setProgress = (el, percent = 0) => {
	el.style.strokeDasharray = 1;
	el.style.strokeDashoffset = 1 - percent;
};

const startPause = () => {
	if (state.paused) {
		circ.style.animationPlayState = "running";
		timerBtn.textContent = "pause";
		state.paused = !state.paused;
	} else {
		circ.style.animationPlayState = "paused";
		timerBtn.textContent = "start";
		state.paused = !state.paused;
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

const timeUp = el => {
	el.value++;
};

const timeDown = el => {
	el.value--;
};

[...timeInputs].forEach((el, i) => {
	timeUpBtns[i].onclick = () => timeUp(el);
	timeDownBtns[i].onclick = () => timeDown(el);
});

circ.addEventListener("animationend", () => {
	console.log("💥BOOOOM!💥");
	circ.style.animationPlayState = "initial";
});

timerBtn.onclick = startPause;
circ.onclick = startPause;

settingsBtn.onclick = openModal;
// modal.onclick = closeModal;
closeBtn.onclick = closeModal;

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
	let settings = {
		pomodoro: pomodoro * 60,
		// pomodoro: pomodoro * 6,
		shortBreak: shortBreak * 60,
		// shortBreak: shortBreak * 6,
		longBreak: longBreak * 60,
		// longBreak: longBreak * 6,
		font,
		color
	};
	console.log(settings);
	updateSettings(settings);
	renderDOM(state);
	closeBtn.click();
};

const setColor = color => {
	root.style.setProperty(`--color-selected`, `var(--color-${color})`);
};

const fontMap = {
	open: `"Open Sans", sans-serif`,
	robotoSlab: `"Roboto Slab", sans-serif`,
	source: `"Source Serif Pro", serif`
};

const setFont = font => {
	document.body.style.fontFamily = fontMap[font];
};

const setActivePhase = phase => {
	let statusPhases = [...document.getElementsByClassName("status__phase")];
	statusPhases.forEach(el => {
		el.classList.remove("status__phase--active");
	});
	statusPhases.forEach(el => {
		if (el.textContent.replace(" ", "").replace("b", "B") === phase) {
			el.classList.add("status__phase--active");
		}
	});
};

const secondsToTime = seconds => {
	let secs = seconds % 60;
	let mins = Math.floor(seconds / 60);
	if (secs < 10) secs = "0" + secs;

	return `${mins}:${secs}`;
};

const setTime = seconds => {
	let time = document.getElementsByClassName("timer__time")[0];
	time.textContent = secondsToTime(seconds);
};

const setStroke = () => {
	circ.style.strokeDashoffset = `${state.timeRemain /
		state.settings[phases[state.phase]]}`;
};

const updateSettings = settings => {
	state.settings = settings;
	state.phase = 0;
	state.timeRemain = state.settings[phases[state.phase]];
};

const renderDOM = () => {
	setTime(state.timeRemain);
	setActivePhase(phases[state.phase]);
	setFont(state.settings.font);
	setColor(state.settings.color);
	setStroke();
};

const main = () => {
	if (state.paused) return;
	state.timeRemain--;
	if (state.timeRemain <= 0) {
		state.phase = state.phase === phases.length - 1 ? 0 : ++state.phase;
		state.timeRemain = state.settings[phases[state.phase]];
		setActivePhase(phases[state.phase]);
	}
	setTime(state.timeRemain);
	setStroke();
};

renderDOM(state);

setInterval(main, 1000);
