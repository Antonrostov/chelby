function getCompChoice() {
	const comp = Math.random();
	if (comp < (1 / 3)) return 'rock';
	if (comp >= (1 / 3) && comp < (2 / 3)) return 'paper';
	return 'scissor';
}
let result = null;
function getResult(comp, player) {
	if (player == comp) return result = 'DRAW';
	if (player == 'rock') return (comp == 'scissor') ? result = 'PLAYER 1 WIN' : result = 'COM WIN';
	if (player == 'paper') return (comp == 'rock') ? result = 'PLAYER 1 WIN' : result = 'COM WIN';
	if (player == 'scissor') return (comp == 'paper') ? result = 'PLAYER 1 WIN' : result = 'COM WIN';
}
const versus = document.querySelector('.versus h1');
const resultClass = document.querySelector('.versus div div');
const textResult = document.querySelector('.versus h5');
const compBox = document.querySelectorAll('.greyBox.compImage');
const playerBox = document.querySelectorAll('.greyBox.playerImage');
function wait() {
	const start = new Date().getTime();
	let i = 0;
	setInterval(function () {
		if (new Date().getTime() - start >= 1000) {
			clearInterval;
			return;
		}
		compBox[i++].style.backgroundColor = '#c4c4c4';
		if (i == compBox.length) i = 0;
		resultClass.classList.remove('result');
		versus.style.color = 'rgb(189,48,46)';
	}, 50);
	setTimeout(function () {
		setInterval(function () {
			if (new Date().getTime() - start >= 1200) {
				clearInterval;
				return;
			}
			compBox[i++].style.backgroundColor = '#9c835f';
			if (i == compBox.length) i = 0;
		}, 50);
	}, 50);
}
const player = document.querySelectorAll('.contentImage .player');
player.forEach(function (choice) {
	choice.addEventListener('click', function () {
		for (let i = 0; i < playerBox.length; i++) {
			playerBox[i].style.backgroundColor = '#9c835f';
		}
		if (result === null) {
			const compChoice = getCompChoice();
			const playerChoice = choice.className.substr(7, 7);
			result = getResult(compChoice, playerChoice);
			if (playerChoice == 'rock') {
				playerBox[0].style.backgroundColor = '#c4c4c4';
			}
			else if (playerChoice == 'paper') {
				playerBox[1].style.backgroundColor = '#c4c4c4';
			}
			else {
				playerBox[2].style.backgroundColor = '#c4c4c4';
			}
			wait();
			setTimeout(function () {
				versus.style.color = '#9c835f';
				resultClass.classList.add('result');
				textResult.innerHTML = result;
				if (result == "DRAW") {
					textResult.style.backgroundColor = '#225c0e';
				}
				else {
					textResult.style.backgroundColor = '#4c9654';
				}
				if (compChoice == 'rock') {
					compBox[0].style.backgroundColor = '#c4c4c4';
				}
				else if (compChoice == 'paper') {
					compBox[1].style.backgroundColor = '#c4c4c4';
				}
				else {
					compBox[2].style.backgroundColor = '#c4c4c4';
				}
			}, 1200);
		}
		else {
			alert('Silahkan tekan logo refresh terlebih dahulu!');
		}
	});
});
const reset = document.querySelector('.refresh');
reset.addEventListener('click', function () {
	textResult.innerHTML = '';
	resultClass.classList.remove('result');
	for (let i = 0; i < compBox.length; i++) {
		playerBox[i].style.backgroundColor = '#9c835f';
		compBox[i].style.backgroundColor = '#9c835f';
	}
	versus.style.color = 'rgb(189,48,46)';
	result = null;
});
