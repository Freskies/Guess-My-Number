"use strict";

// adjust logs
console.log(document.querySelector(".results").style.marginLeft);

// COSTANTS

const LOGS_LABEL = document.querySelector(".logs");
const SCORE_LABEL = document.querySelector(".score-value");
const HIGHSCORE_LABEL = document.querySelector(".highscore-value");
const GAME_INPUT = document.querySelector(".game-input");

const START_SCORE = 10;

// STATE

let secretNumber = generateSecretNumber();
let score = START_SCORE;
let highscore = 0;

let win_state = false;
let lose_state = false;

function generateSecretNumber() {
	return Math.trunc(Math.random() * 20) + 1;
}
function getSecretNumber() {
	return secretNumber;
}

function getScore() {
	return score;
}
function lowerScore() {
	if (score > 0) score--;
	SCORE_LABEL.textContent = score;
	return score;
}

function getHighscore() {
	return highscore;
}
function setHighscore(newScore) {
	if (newScore > highscore) highscore = newScore;
	HIGHSCORE_LABEL.textContent = highscore;
	return highscore;
}

function isWin() {
	return win_state;
}

function isLose() {
	return lose_state;
}
function checkLose() {
	return score === 0;
}

// HELPER

function isValid(guess) {
	console.log(guess);
	return guess ? 0 < guess && guess <= 20 : false;
}

// EVENT LISTENERS

function guessListener() {
	const guess = Number(GAME_INPUT.value);
	if (!isLose() && !isWin()) {
		if (!isValid(guess)) noNumberError();
		else if (guess === getSecretNumber()) win();
		else {
			lowerScore();
			if (checkLose()) lose();
			else giveHint(guess);
		}
	}
}

function againListener() {
	score = START_SCORE;
	SCORE_LABEL.textContent = score;
	secretNumber = generateSecretNumber();
	document.querySelector("body").style.backgroundColor = "#222";

	win_state = false;
	lose_state = false;
	LOGS_LABEL.textContent = "Start Guessing...";
}

// SITUATION

function win() {
	win_state = true;
	setHighscore(getScore());
	LOGS_LABEL.textContent = "You Win!";
	document.querySelector("body").style.backgroundColor = "#60b347";
}

function lose() {
	lose_state = true;
	LOGS_LABEL.textContent = "You Lose!";
	document.querySelector("body").style.backgroundColor = "#b35047";
}

function giveHint(guess) {
	LOGS_LABEL.textContent = `${guess} is Too ${
		guess < getSecretNumber() ? "Low" : "High"
	}!`;
}

function noNumberError() {
	LOGS_LABEL.textContent = "❌ Invalid input!";
}

// MAIN

document.querySelector(".btn--guess").addEventListener("click", guessListener);
document.querySelector(".btn--again").addEventListener("click", againListener);
