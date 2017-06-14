var gameRunning = false;	//Booleanskt värde för om spelaren har startat spelet eller ej.
							//Om det är falskt kan man trycka hur mycket man vill på förgerna.
var userClick = "";			//Variabel som ändras till en visst värde när spelaren har tryckt på en färg.
var correctSequence = true;	//Är true hela tiden. Ändras den till false så kommer spelet att avslutas.
var sequence = [];			//Array som skall hålla i spelsekvensen.
var sequenceCountDisplay = document.getElementById("sequenceCountDisplay"); //Knyter en variabel till sekvensmätarens element i HTML-koden.
var currentIndex = 0;		//Håller koll på vilket index i sekvensen som skall kontrolleras just nu.

var startButton = document.getElementById("startButton");	//Knyter en variabel till startknappen i HTML-koden.
startButton.addEventListener("click", startGame);			//När användaren klickar på startknappen körs funktionen startGame.

var buttonGreen = document.getElementById("buttonGreen");	//Knyter en variabel till grön knapp i HTML-koden.
buttonGreen.addEventListener("click", buttonPressGreen);	//När användaren klickar på grön knapp körs funktionen buttonPressGreen.
var buttonRed = document.getElementById("buttonRed");		//Knyter en variabel till röd knapp i HTML-koden.
buttonRed.addEventListener("click", buttonPressRed);		//När användaren klickar på röd knapp körs funktionen buttonPressRed.
var buttonBlue = document.getElementById("buttonBlue");		//Knyter en variabel till blå knapp i HTML-koden.
buttonBlue.addEventListener("click", buttonPressBlue);		//När användaren klickar på blå knapp körs funktionen buttonPressBlue.
var buttonYellow = document.getElementById("buttonYellow");	//Knyter en variabel till gul knapp i HTML-koden.
buttonYellow.addEventListener("click", buttonPressYellow);	//När användaren klickar på gul knapp körs funktionen buttonPressYellow.

var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"); 	//Länkar ljud från webben till en variabel.
var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");		//Länkar ljud från webben till en variabel.
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");	//Länkar ljud från webben till en variabel.
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");		//Länkar ljud från webben till en variabel.


function buttonPressGreen(){	//När användaren trycker på grön:
	setTimeout(function(){		//Väntar 175 millisekunder
  	greenSound.play();			//Spelar upp ljudet
  	},175);
  	userClick = "green";		//Ändrar userClick till färgen som har klickats
  	if (gameRunning) {			//Om spelet är igång så ska userClick kontrolleras
  		inputCheck();			//med hjälp av funktionen inputCheck.
  	}
}
function buttonPressRed(){		//När användaren trycker på röd:
	setTimeout(function(){		//Resten är som funktionen ovan.
  redSound.play();
  },175);
  userClick = "red";
  if (gameRunning) {
  	inputCheck();
  }
}
function buttonPressYellow(){	//När användaren trycker på blå:
	setTimeout(function(){		//Resten är som funktionen ovan.
  yellowSound.play();
  },175);
  userClick = "yellow";
  if (gameRunning) {
  	inputCheck();
  }
}
function buttonPressBlue(){		//När användaren trycker på gul:
	setTimeout(function(){		//Resten är som funktionen ovan.
  blueSound.play();
  },175);
  userClick = "blue";
  if (gameRunning) {
  	inputCheck();
  }
}


function generateSequenceStep() {			//Funktion som genererar spelsekvensen:
	var randomNumber = Math.floor(Math.random() * 4);//Slumpar ett heltal f.om. 0 t.om. 3
	
	switch(randomNumber){					//Beroende på vilket nummer som slumpats ovan 
		case 0: sequence.push("green");		//pushas(läggs till i slutet) respektive färg till arrayen sequence.
			break;
		case 1: sequence.push("red");
			break;
		case 2: sequence.push("yellow");
			break;
		case 3: sequence.push("blue");
			break;
	}
}

function playBackSequence() {	//Funktion för att spela upp den genererade sekvensen:
	var tempCurrentIndex = 0;	//Lokal variabel för att hålla koll på vilket index i sequence som kontrolleras
	setInterval(function(){		//Repeterar följande kod var 900e millisekund:

		//Beroende på vilket nuvarande index är ändras genomskinligheten för respektive färg och ett ljud spelas upp
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
		tempCurrentIndex++;		//Ökar den lokala indexvariabeln med 1
		setTimeout(function(){	//Väntar 750 millisekunder innan genomskinligheten återställs
			buttonGreen.style.opacity = "1";
			buttonRed.style.opacity = "1";
			buttonYellow.style.opacity = "1";
			buttonBlue.style.opacity = "1";
		}, 750);

		//Om den lokala indexvariabeln nu är större än längden på arrayen sequence:
		if (tempCurrentIndex > sequence.length) {
			clearInterval(); //Avslutar repetition av kod
		}
	}, 900);

	//Återställer både lokal och global indexvariebel(för säkerhets skull)
	currentIndex = 0;
  	tempCurrentIndex = 0;
}

function inputCheck(){	//Funktion för kontroll av användarval(körs varje gång användaren trycker på en färg):

	//Om userClick är detsamma som nuvarande index i sequence:
	if (userClick == sequence[currentIndex]) {
		currentIndex++;			//Öka index med 1
	}else{
		correctSequence = false;//Indikerar att användaren har gjort fel val
	}

	//Om användaren har gjort fel val:
	if (!correctSequence) {
		gameOver();	//Kör funktionen gameOver
	}else if (currentIndex >= sequence.length) {	//Om användaren har nått slutet av sekvensen:
		nextRound();//Kör funktionen nextRound
	}
}

function gameOver(){	//Funktion för meddelande vid förlust:

	//Om användaren har gjort fel val:
	if (!correctSequence) {
		alert("Game Over! You were able to remember " + (sequence.length - 1) + " steps!");
		currentIndex = 0;	//Återställer nuvarande index
		gameRunning = false;//Indikerar att sepelt har tagit slut. Användaren kan leka med knapparna igen
	}
}

function startGame(){	//Funktion för när användaren trycker på startknappen:
	gameRunning = true;	//Indikerar att spelet har börjat
	currentIndex = 0;	//Återställer nuvarande index
	sequence = [];		//Återställer spelsekvensen
	correctSequence = true;	//Återställer variabel som indikerar att användaren har gjort fel val
	generateSequenceStep();	//Kör funktionen som genererar en ny sekvens
	sequenceCountDisplay.innerHTML = sequence.length;	//Uppdaterar antalet steg i sekvensen till sekvensmätaren i HTML-dokumentet

	setTimeout(function(){	//Paus på 750 millisekunder
	playBackSequence();		//Kör funktionen som spelar upp den nya sekvensen
	}, 750);
}

function nextRound(){		//Funktion som startar en ny runda efter en korrekt sekvens:
	correctSequence = true;	//Återställer variabel som indikerar att användaren har gjort fel val(för säkerhets skull)
	currentIndex = 0;		//Återställer nuvarande index
	generateSequenceStep();	//Generar ett nytt sekvenssteg
	sequenceCountDisplay.innerHTML = sequence.length;	//Uppdaterar antalet steg i sekvensen till sekvensmätaren i HTML-dokumentet

	setTimeout(function(){	//Paus på 750 millisekunder
	playBackSequence();		//Kör funktionen som spelar upp den nya sekvensen
	}, 750);
}