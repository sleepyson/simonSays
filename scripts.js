var gameRunning = false;
var userClick = "";
var correctSequence = true;
var sequence = [];
var sequenceCountDisplay = document.getElementById("sequenceCountDisplay");
var currentIndex = 0;

var startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

var buttonGreen = document.getElementById("buttonGreen");
buttonGreen.addEventListener("click", buttonPressGreen);
var buttonRed = document.getElementById("buttonRed");
buttonRed.addEventListener("click", buttonPressRed);
var buttonBlue = document.getElementById("buttonBlue");
buttonBlue.addEventListener("click", buttonPressBlue);
var buttonYellow = document.getElementById("buttonYellow");
buttonYellow.addEventListener("click", buttonPressYellow);

var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");


function buttonPressGreen(){
	setTimeout(function(){
  	greenSound.play();
  	},175);
  	userClick = "green";
  	if (gameRunning) {
  		inputCheck();
  	}
}
function buttonPressRed(){
	setTimeout(function(){
  redSound.play();
  },175);
  userClick = "red";
  if (gameRunning) {
  	inputCheck();
  }
}
function buttonPressYellow(){
	setTimeout(function(){
  yellowSound.play();
  },175);
  userClick = "yellow";
  if (gameRunning) {
  	inputCheck();
  }
}
function buttonPressBlue(){
	setTimeout(function(){
  blueSound.play();
  },175);
  userClick = "blue";
  if (gameRunning) {
  	inputCheck();
  }
}


function generateSequenceStep() {
	var randomNumber = Math.floor(Math.random() * 4);
	
	switch(randomNumber){
		case 0: sequence.push("green");
			break;
		case 1: sequence.push("red");
			break;
		case 2: sequence.push("yellow");
			break;
		case 3: sequence.push("blue");
			break;
	}
}

function playBackSequence() {
	var tempCurrentIndex = 0;
	setInterval(function(){
		if (sequence[tempCurrentIndex] == "green") {
			buttonGreen.style.opacity = "0.4";
			greenSound.play();
		}else if(sequence[tempCurrentIndex] == "red"){
			buttonRed.style.opacity = "0.4";
			redSound.play();
		}else if(sequence[tempCurrentIndex] == "yellow"){
			buttonYellow.style.opacity = "0.4";
			yellowSound.play();
		}else if(sequence[tempCurrentIndex] == "blue"){
			buttonBlue.style.opacity = "0.4";
			blueSound.play();
		}
		tempCurrentIndex++;
		setTimeout(function(){
			buttonGreen.style.opacity = "1";
			buttonRed.style.opacity = "1";
			buttonYellow.style.opacity = "1";
			buttonBlue.style.opacity = "1";
		}, 750);//750
		if (tempCurrentIndex > sequence.length) {
			clearInterval();
		}
	}, 900);//800
	currentIndex = 0;
  	tempCurrentIndex = 0;
}

function inputCheck(){
	if (userClick == sequence[currentIndex]) {
		currentIndex++;
	}else{
		correctSequence = false;
	}

	if (!correctSequence) {
		gameOver();
	}else if (currentIndex >= sequence.length) {
		nextRound();
	}
}

function gameOver(){
	if (!correctSequence) {
		alert("Game Over! You were able to remember " + (sequence.length - 1) + " steps!");
		currentIndex = 0;
		gameRunning = false;
	}
}

function startGame(){
	gameRunning = true;
	currentIndex = 0;
	sequence = [];
	correctSequence = true;
	generateSequenceStep();
	sequenceCountDisplay.innerHTML = sequence.length;

	setTimeout(function(){
	playBackSequence();
	}, 750);
}

function nextRound(){
	correctSequence = true;
	currentIndex = 0;
	generateSequenceStep();
	sequenceCountDisplay.innerHTML = sequence.length;

	setTimeout(function(){
	playBackSequence();
	}, 750);
}
