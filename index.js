const start = document.querySelector('.start-btn');
const restart = document.querySelector('.restart-btn')
const gamePlace = document.querySelector('.game-place');
const startSection = document.querySelector('.start_section');
const startInfo = document.querySelector('.start-info');
const restartInfo = document.querySelector('.restart_section')
const restartSection = document.querySelector('.restart-info')
const musicSection = document.querySelector('.music_section')
const timerPlace = document.querySelector('.timer-place')
const scoreSection = document.querySelector('.score_section');
let score = 0;
const setScore = (value) => scoreSection.textContent = `Ну давай, заплачь (凸ಠ益ಠ)凸 ${value}`;
setScore(score);
const finalScore = document.querySelector('.final-score')
const setFinalScore = (value) => finalScore.textContent = `Ваше очкО: ${value}`
setFinalScore(score);

const keysLines = {
	a: 0, A: 0, ф: 0, Ф: 0,
	s: 1, S: 1, ы: 1, Ы: 1,
	d: 2, D: 2, в: 2, В: 2,
	f: 3, F: 3, а: 3, А: 3
};

const music = document.querySelector('.music-btn');
music.textContent = `Включить музыку`;
const ost = new Audio('./music/hmstck.mp3');


const dataBaseNotes = {
	0: [],
	1: [],
	2: [],
	3: []
};

function createNotaGovna() {
	const noteLines = document.getElementsByClassName('game-collum');
	const outLines =  document.getElementsByClassName("game-btn");
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
			setTimeout(() => {
				const index = dataBaseNotes[column].indexOf(currentNote);
				if (index > -1) { 
					dataBaseNotes[column].splice(index, 1); 
				}
				score -= 10;
				setScore(score);
				setFinalScore(score);
				currentNote.remove();
			}, 50); 
		}

		position += 1;
	}
	let moving = setInterval(() => moveNote(note, outLines[column]));
	moveNote(note, outLines[column]);
}


function gameStart () {

	let minute = 2;
	let sec = 60;

	setInterval(function timer() {

		timerPlace.textContent = `Время: ${minute - 1}:${sec - 1}`;
		--sec;
		if (sec == 00) {
			--minute;
			sec = 60;

			if (minute == 0) {
				restartSection.classList.remove('hidden');
				restartInfo.classList.remove('hidden')
				gamePlace.classList.add('hidden');
				scoreSection.classList.add('hidden');
				musicSection.classList.add('hidden');
				setTimeout(gameStart());
			}
		}
	}, 1000);
	document.addEventListener('keydown', e => {
		// console.log(keysLines[e.key]);
		// console.log(dataBaseNotes[keysLines[e.key]]);
	
		let popal = false;
		const outLines =  document.getElementsByClassName("game-btn");
		const column = keysLines[e.key];
	
		for (let i = 0; i < dataBaseNotes[column].length; i++) {
			if (outLines[column].getBoundingClientRect().top <= dataBaseNotes[column][i].getBoundingClientRect().bottom) {
				popal = true;
				const elem = dataBaseNotes[column][i];
				dataBaseNotes[column].splice(i, 1); 
				elem.remove();
			}
		}
	
		if (popal) {
			score += 47;
			setScore(score);
			setFinalScore(score);
			outLines[column].classList.add('game-btn-popal')
			setTimeout(() => {
				outLines[column].classList.remove('game-btn-popal');
			}, 200);
		} else {
			score -= 100000
			setScore(score);
			setFinalScore(score);
			outLines[column].classList.add('game-btn-ne-popal')
			setTimeout(() => {
				outLines[column].classList.remove('game-btn-ne-popal');
			}, 200);
		}
	})
	
	setInterval(() => createNotaGovna(), 1000);
}



start.addEventListener('click', () => {
	startSection.classList.add('hidden');
	startInfo.classList.add('hidden')
	gamePlace.classList.remove('hidden');
	scoreSection.classList.remove('hidden');
	musicSection.classList.remove('hidden');

	gameStart();
	// timerGovna();

})

restart.addEventListener('click', () => {
	restartSection.classList.add('hidden');
	restartInfo.classList.add('hidden')
	gamePlace.classList.remove('hidden');
	scoreSection.classList.remove('hidden');
	musicSection.classList.remove('hidden');

	gameStart();
	// timerGovna();

})

// function timerGovna () {
// 	let minute = 1;
// 	let sec = 3;

// 	setInterval(function timer() {

// 		timerPlace.textContent = `Время: ${minute - 1}:${sec - 1}`;
// 		--sec;
// 		if (sec == 00) {
// 			--minute;
// 			sec = 4;

// 			if (minute == 0) {
// 				restartSection.classList.remove('hidden');
// 				restartInfo.classList.remove('hidden')
// 				gamePlace.classList.add('hidden');
// 				scoreSection.classList.add('hidden');
// 				musicSection.classList.add('hidden');
// 			}
// 		}
// 	}, 1000);
// }

music.addEventListener('click', () => {
	if (ost.paused) {
			ost.play();
			music.textContent = `Выключить музыку`
	} else {
			ost.pause();
			music.textContent = `Включить музыку`
	}
});