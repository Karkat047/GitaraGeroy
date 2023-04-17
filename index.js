const scoreInfo = document.querySelector('.score-info');
let score = 0;
const scorePopal = +47;
const scoreNePopal = -1000;
const scoreOutline = -10;
const setScore = (value) => scoreInfo.textContent = `Ну давай, заплачь (凸ಠ益ಠ)凸 ${value}`;
setScore(score);

const finalScore = document.querySelector('.final-score');
const setFinalScore = (value) => finalScore.textContent = `Ваше очкО: ${value}`;
setFinalScore(score);

let scoreChangeInfo = '';
const scoreChanges = document.querySelector('.score-changes');

let sozdavatNote;

const onimeSection = document.querySelector('body');
const comboSection = document.querySelector('.onime-info');
comboSection.textContent = `Чё, пацаны, Онимэ?`
let combo = 20;
const setComboScore = (value) => comboSection.textContent = `До онимэ тянки: ${value}`;
setComboScore(combo);

const noteLines = document.getElementsByClassName('game-collum');
const outLines =  document.getElementsByClassName("game-btn");
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
	if (budemVizivat != 2) {
		return
	}
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
				score += scoreOutline;
				setScore(score);
				setFinalScore(score);
				setComboScore(combo);
				currentNote.remove();
				scoreChanges.textContent = `${scoreOutline}`;
				scoreChanges.classList.add('red');
				setTimeout(() => {
					outLines[column].classList.remove('game-btn-popal');
					scoreChanges.textContent = '';
					scoreChanges.classList.remove('red');
				}, 200);
			}, 200); 
		}

		position += 1;
	}
	let moving = setInterval(() => moveNote(note, outLines[column]));
	moveNote(note, outLines[column]);
}

//Buttons

function knopki (e) {
			
	let popal = false;
	
	const column = keysLines.hasOwnProperty(e.key) ? keysLines[e.key] : -1;
	if (column !== -1) {
		for (let i = 0; i < dataBaseNotes[column].length; i++) {
			if (outLines[column].getBoundingClientRect().top <= dataBaseNotes[column][i].getBoundingClientRect().bottom
			&& outLines[column].getBoundingClientRect().bottom >= dataBaseNotes[column][i].getBoundingClientRect().top  ) {
				popal = true;
				const elem = dataBaseNotes[column][i];
				dataBaseNotes[column].splice(i, 1); 
				elem.remove();
			}
		}
	
		if (popal) {
			combo += -1;
			score += scorePopal;
			setScore(score);
			setFinalScore(score);
			outLines[column].classList.add('game-btn-popal');
			setComboScore(combo);
			scoreChanges.textContent = `+${scorePopal}`;
			scoreChanges.classList.add('green');
			setTimeout(() => {
				outLines[column].classList.remove('game-btn-popal');
				scoreChanges.textContent = '';
				scoreChanges.classList.remove('green');
			}, 200);

		} else {
			combo = 20;
			score += scoreNePopal;
			setScore(score);
			setFinalScore(score);
			outLines[column].classList.add('game-btn-ne-popal')
			setComboScore(combo);
			comboSection.textContent = `До онимэ тянки: ${combo}`;
			scoreChanges.textContent = `${scoreNePopal}`;
			scoreChanges.classList.add('red');
			setTimeout(() => {
				outLines[column].classList.remove('game-btn-ne-popal');
				scoreChanges.textContent = '';
				scoreChanges.classList.remove('red');
			}, 200);
		}
	}	
	
	comboSection.textContent = `До онимэ тянки: ${combo}`;

	if (combo == 0) {
		onimeSection.classList.add('combo-bg')
		comboSection.textContent = `ОНИМЭ!`;
		combo = 20;
		setTimeout(() => {
			outLines[column].classList.remove('game-btn-popal');
			onimeSection.classList.remove('combo-bg');
			comboSection.textContent = `До онимэ тянки: ${combo}`;
		}, 200);
	};
};

//GameStart

function gameStart () {

	document.addEventListener('keydown', knopki);
	sozdavatNote = setInterval(() => createNotaGovna(), 250);
}

//Start/Restart

const start = document.querySelector('.start-btn');
const restart = document.querySelector('.restart-btn');
const scoreSection = document.querySelector('.score-section');
const gamePlace = document.querySelector('.game-place');
const startSection = document.querySelector('.start-section');
const startInfo = document.querySelector('.start-info');
const restartInfo = document.querySelector('.restart-section');
const restartSection = document.querySelector('.restart-info');
const musicSection = document.querySelector('.music-section');

start.addEventListener('click', () => {
	startSection.classList.add('hidden');
	startInfo.classList.add('hidden')
	gamePlace.classList.remove('hidden');
	scoreSection.classList.remove('hidden');
	musicSection.classList.remove('hidden');

	gameStart();
	timerGovna();
	comboSection.textContent = `До онимэ тянки: ${combo}`
})

restart.addEventListener('click', () => {
	restartSection.classList.add('hidden');
	restartInfo.classList.add('hidden')
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
		if (sec == 00) {
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
	restartSection.classList.remove('hidden');
	restartInfo.classList.remove('hidden')
	gamePlace.classList.add('hidden');
	scoreSection.classList.add('hidden');
	musicSection.classList.add('hidden');
	comboSection.textContent = `Чё, пацаны, Онимэ?`
	document.removeEventListener('keydown', knopki);
	clearInterval(sozdavatNote);
	clearInterval(intervalTimera);
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
