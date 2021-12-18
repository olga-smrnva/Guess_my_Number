let secretNumber = Math.trunc(Math.random()*35+1);
let scoreCount = 10;
let highscore = 0;

const guessInput =  document.querySelector(".guess");
const compNumber = document.querySelector(".number");
const messageElm = document.querySelector(".message");
const check = document.querySelector(".check");
const body = document.querySelector("body");
const baloonsElm = document.querySelector(".baloons");
const score = document.querySelector(".score");
const newHighscore = document.querySelector(".highscore");
const againButton = document.querySelector(".again");
const leftElm = document.querySelector(".left");
const baloons = document.querySelectorAll(".baloon");

// compNumber.textContent = secretNumber;  //For tests 

const displayMessage = function(message) {
	messageElm.textContent = message;
};

const buttonAgainAmination = function() {
	setTimeout(() => {
		againButton.classList.add("animate__tada");
	}, 800);
};

const flybaloons = function() {
	baloonsElm.classList.remove("hidden");
	baloons.forEach(function(baloon) {
		let top = 105;
		let timer =	setInterval(() => {
			if (top > 37) {
				top--; 
				baloon.style.top = top + "vh";
			} else{
				clearInterval(timer);
			};
		}, 10);
	});
};

//Check button
check.addEventListener("click", function(event) {
	event.preventDefault();
	const guess = Number(guessInput.value);

	// When there is no input
	if(!guess) {
		displayMessage("You forgot to enter a number!");
			
	//When player wins
	} else if (guess === secretNumber) {
		displayMessage("Great Job! 🤩 Correct Number!");
		compNumber.textContent = secretNumber; 
		flybaloons();
		leftElm.classList.add("hidden");

		if(scoreCount > highscore) {
			highscore = scoreCount;
			newHighscore.textContent = highscore;
		};
		buttonAgainAmination();
		messageElm.classList.add("win-info");
	
	//When the input is wrong
	} else if (guess !== secretNumber) {
		if (scoreCount > 1) {
			displayMessage(guess > secretNumber ? "Too high, try one more time" : 
			"To low, try one more time");
			scoreCount--;
			score.textContent = scoreCount;
		} else {
			displayMessage("Game over!");
			score.textContent = 0;
			leftElm.classList.add("hidden");

			buttonAgainAmination();
			messageElm.classList.add("win-info");

			body.classList.add("lose-color");
		};
	};
	guessInput.value = "";
});  

//Again button
againButton.addEventListener("click", function() {
	scoreCount = 10;
	secretNumber = Math.trunc(Math.random()*35+1);

	displayMessage("Start guessing");
	score.textContent = scoreCount;
	compNumber.textContent = "?";
	guessInput.value = "";

	againButton.classList.remove("animate__tada");
	messageElm.classList.remove("win-info");

	baloonsElm.classList.add("hidden");
	leftElm.classList.remove("hidden");

	body.classList.remove("lose-color");
});