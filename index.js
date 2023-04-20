const scoreInfo = document.querySelector('.score-info');
let score = 0;
const scorePopal = +20;
const scoreNePopal = -30;
const scoreOutline = -10;
const setScore = (value) => scoreInfo.textContent = `Ну давай, заплачь (凸ಠ益ಠ)凸 ${value}`;
setScore(score);

const finalScore = document.querySelector('.final-score');
const setFinalScore = (value) => finalScore.textContent = `Ваше очкО: ${value}`;
setFinalScore(score);

let scoreChangeInfo = '';
const scoreChanges = document.querySelector('.score-changes');

let speedLevelInfo = 1;
let speedLevel = 5;
const levelPlus = document.querySelector('.level-plus');
const levelMinus = document.querySelector('.level-minus');
const levelInfo = document.querySelector('.level-info');
const setSpeedLevelInfo = (value) => levelInfo.textContent = `${value}`;
setSpeedLevelInfo(speedLevelInfo);

let multiplier = 1;
const multiplierInfo = document.querySelector('.combo-multiplier');
const setMultiplierInfo = (value) => multiplierInfo.textContent = `Комбо: х${value}`;
setMultiplierInfo(multiplier);

const onimeSection = document.querySelector('.bg-place');
const comboSection = document.querySelector('.onime-info');
let combo = 20;
const setComboScore = (value) => comboSection.textContent = `До онимэ тянки: ${value}`;
setComboScore(combo);

let sozdavatNote;

const noteLines = document.getElementsByClassName('game-collum');
const outLines = document.getElementsByClassName("game-btn");
const keysLines = {
	a: 0, A: 0, ф: 0, Ф: 0,
	s: 1, S: 1, ы: 1, Ы: 1,
	d: 2, D: 2, в: 2, В: 2,
	f: 3, F: 3, а: 3, А: 3
};

const dataBaseNotes = {
	0: [],
	1: [],
	2: [],
	3: []
};

//CreateNote

function createNotaGovna() {
	let budemVizivat = Math.ceil(Math.random() * 4);
	if (budemVizivat != 2) return
		
	const column = Math.ceil(Math.random()*noteLines.length) - 1;
	const note = document.createElement('div');
	note.classList.add('note');

	dataBaseNotes[column].push(note);

	noteLines[column].insertAdjacentElement('beforeend', note);

	let position = 0;
	const moveNote = (currentNote, outLine) => {
		currentNote.style.top = `${Number(position)}px`;
		if (outLine.getBoundingClientRect().bottom < (currentNote.getBoundingClientRect().top )) {
			clearInterval(moving);
			currentNote.classList.add('govna')
			setTimeout(() => {
				const index = dataBaseNotes[column].indexOf(currentNote);
				if (index > -1) { 
					dataBaseNotes[column].splice(index, 1); 
				}
				combo = 20;
				score <= 10 ? score = 0 : score += scoreOutline * speedLevelInfo;
				multiplier = 1;
				setScore(score);
				setFinalScore(score);
				setComboScore(combo);
				setMultiplierInfo(multiplier);
				currentNote.remove();
				scoreChanges.textContent = `${scoreOutline * speedLevelInfo}`;
				scoreChanges.classList.add('red');
				zvukMimoPlay();
				setTimeout(() => {
					outLines[column].classList.remove('game-btn-popal');
					scoreChanges.textContent = '';
					scoreChanges.classList.remove('red');
				}, 200);
			}, 200); 
		}

		position += speedLevel;
	}
	let moving = setInterval(() => moveNote(note, outLines[column]), 17);
	moveNote(note, outLines[column]);
}

//Buttons

function knopki(e) {
			
	let hit = false;
	
	const column = keysLines.hasOwnProperty(e.key) ? keysLines[e.key] : -1;
	if (column !== -1) {
		for (let i = 0; i < dataBaseNotes[column].length; i++) {
			if (
				outLines[column].getBoundingClientRect().top <= dataBaseNotes[column][i].getBoundingClientRect().bottom
				&& outLines[column].getBoundingClientRect().bottom >= dataBaseNotes[column][i].getBoundingClientRect().top
			) {
				hit = true;
				const elem = dataBaseNotes[column][i];
				dataBaseNotes[column].splice(i, 1); 
				elem.remove();
			}
		}
	
		if (hit) {
			combo -= 1;
			score += scorePopal * multiplier * speedLevelInfo;
			setScore(score);
			setFinalScore(score);
			outLines[column].classList.add('game-btn-popal');
			setComboScore(combo);
			scoreChanges.textContent = `+${scorePopal * multiplier * speedLevelInfo}`;
			scoreChanges.classList.add('green');
			zvukPopalPlay();
			setTimeout(() => {
				outLines[column].classList.remove('game-btn-popal');
				scoreChanges.textContent = '';
				scoreChanges.classList.remove('green');
			}, 200);

		} else {
			combo = 20;
			score <= 20 ? score = 0 : score += scoreNePopal * speedLevelInfo;
			multiplier = 1;
			setScore(score);
			setFinalScore(score);
			setMultiplierInfo(multiplier);
			outLines[column].classList.add('game-btn-ne-popal')
			setComboScore(combo);
			scoreChanges.textContent = `${scoreNePopal * speedLevelInfo}`;
			scoreChanges.classList.add('red');
			zvukNePopalPlay();
			setTimeout(() => {
				outLines[column].classList.remove('game-btn-ne-popal');
				scoreChanges.textContent = '';
				scoreChanges.classList.remove('red');
			}, 200);
		}
	}	

	if (combo == 0) {
		onime ();
		comboSection.textContent = `ОНИМЭ!`;
		combo = 20;
		multiplier += 1;
		setMultiplierInfo(multiplier);
		setTimeout(() => {
			outLines[column].classList.remove('game-btn-popal');
			comboSection.textContent = `До онимэ тянки: ${combo}`;
		}, 200);
	};

};

//GameStart

const gameStart = () => {

	document.addEventListener('keydown', knopki);
	sozdavatNote = setInterval(() => createNotaGovna(), 250);
}

//Start/Restart

const start = document.querySelector('.start-btn');
const scoreSection = document.querySelector('.score-section');
const gamePlace = document.querySelector('.game-place');
const startSection = document.querySelector('.start-section');
const startInfo = document.querySelector('.start-info');
const musicSection = document.querySelector('.music-section');

start.addEventListener('click', () => {
	startSection.classList.add('hidden');
	startInfo.classList.add('hidden')
	gamePlace.classList.remove('hidden');
	scoreSection.classList.remove('hidden');
	musicSection.classList.remove('hidden');

	gameStart();
	timerGovna();
	score = 0;
	setScore(score)
	combo = 20;
	comboSection.textContent = `До онимэ тянки: ${combo}`
})

//Timer

const timerPlace = document.querySelector('.timer-place')
let intervalTimera;

function timerGovna () {
	
	let minute = 3;
	let sec = 60;

	intervalTimera = setInterval(function timer() {

		timerPlace.textContent = `Время: ${minute - 1}:${sec - 1}`;
		--sec;
		if (sec == 0) {
			--minute;
			sec = 60;

			if (minute == 0) {
				stopGovna();
			}
		}
	}, 1000);
}

//Stop

function stopGovna() {
	startSection.classList.remove('hidden');
	startInfo.classList.remove('hidden')
	finalScore.classList.remove('hidden')
	gamePlace.classList.add('hidden');
	scoreSection.classList.add('hidden');
	musicSection.classList.add('hidden');
	comboSection.textContent = `Чё, пацаны, Онимэ?`
	document.removeEventListener('keydown', knopki);
	clearInterval(sozdavatNote);
	clearInterval(intervalTimera);
	ost.load();
	music.textContent = `Вкл. музыку`
	document.querySelectorAll('.note').forEach(note => {
		if (note != undefined && note.parentNode !=undefined) note.parentNode.innerHTML = '';
		}
	);
};

const stopBtn = document.querySelector('.stop-btn')
stopBtn.addEventListener('click', stopGovna)

//Music

const music = document.querySelector('.music-btn');
music.textContent = `Вкл. музыку`;
const ost = new Audio('./music/hmstck.mp3');
music.addEventListener('click', () => {
	if (ost.paused) {
			ost.play();
			music.textContent = `Выкл. музыку`
	} else {
			ost.pause();
			music.textContent = `Вкл. музыку`
	}
});

const zvukPopalPlay = () => {
	const zvukPopal = new Audio('./music/popal.mp3');
	zvukPopal.play();
}

const zvukNePopalPlay = () => {
	const zvukNePopal = new Audio('./music/nePopal.mp3');
	zvukNePopal.play();
}

const zvukMimoPlay = () => {
	const zvukMimo = new Audio('./music/mimo.mp3');
	zvukMimo.play();
}

//SpeedLevel

levelPlus.addEventListener('click', () => {
	if (speedLevelInfo < 3) {
		speedLevelInfo += 1;
		setSpeedLevelInfo(speedLevelInfo);
		speedLevel += 5;
	}
})

levelMinus.addEventListener('click', () => {
	if (speedLevelInfo > 1) {
		speedLevelInfo -= 1;
		setSpeedLevelInfo(speedLevelInfo);
		speedLevel -= 5;
	}
})

// Anime

function onime() {
	onimeSection.classList.add('combo-bg')
	setTimeout(() => {
		onimeSection.classList.remove('combo-bg');
	}, 2000);
}