// Based on the webinar with Mike Wales https://www.youtube.com/watch?v=_rUH-sEs68Y

const listOfCards = ['fa-diamond', 'fa-paper-plane-o',
			   'fa-anchor', 'fa-bolt', 'fa-cube',
			   'fa-leaf', 'fa-bicycle', 'fa-bomb',
			   'fa-diamond', 'fa-paper-plane-o',
			   'fa-anchor', 'fa-bolt',
			   'fa-cube', 'fa-leaf',
			   'fa-bicycle', 'fa-bomb'];

let cardsOpened = [];
let cardsMatched = [];
let cards = document.querySelectorAll('.card');
let moves = 0;
let movesCount = document.querySelector('.moves');
let star = document.querySelectorAll('.fa-star');
let restart = document.querySelector('.restart');
let playAgain = document.querySelector('.playAgain');
let timer;
let time = document.querySelector('.timer');
let timerCount = false;
let seconds = 0;
let minutes = 0;
let numberOfMatchedCards = 0;
let modal = document.querySelector('#modal');
let close = document.getElementsByClassName('close')[0];
let modalMessage = document.getElementsByClassName('modalText')[0];
let rating = 3;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create HTML for each of the cards
function createCard(card) {
	return `<li class='card'><i class='fa ${card}'></i></li>`;
}

// Timer is based on https://www.w3schools.com/jsref/met_win_clearinterval.asp
function startTimer() {
	timerCount = true;
    timer = setInterval(function() {
    	time.innerHTML = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '0') + ':' + (seconds > 9 ? seconds : '0' + seconds);
    	seconds ++;
    	if (seconds == 60) {
			seconds = 0;
			minutes++;
		}
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timerCount = false;
}

function restartTimer() {
	clearInterval(timer);
	timerCount = false;
	seconds = 0;
	minutes = 0;
	time.innerHTML = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
}

// Create cards & put them on deck
function startGame() {
	const deck = document.querySelector('.deck');
	const cardHTML = shuffle(listOfCards).map(function(card) {
		return createCard(card);
	});

	restartTimer();
	starRatingByDefault();
	moves = 0;
	movesCount.innerHTML = '0 Moves';
    time.innerHTML = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
	deck.innerHTML = cardHTML.join('');
	cardsMatched = [];
	cardsOpened = [];
	play();
}

// Restart game
restart.addEventListener('click', function(evt) {
	// restartTimer();
	startGame();
});

// Open cards
function flipCardsToOpen(card) {
	card.classList.add('open', 'show');
}

// Two opened matched cards
function openedMatch(card) {
	cardsOpened[0].classList.add('match', 'animated', 'pulse');
	cardsOpened[0].classList.remove('open');
	cardsOpened[0].classList.remove('show');
	cardsOpened[1].classList.add('match', 'animated', 'pulse');
	cardsOpened[1].classList.remove('open');
	cardsOpened[1].classList.remove('show');
	cardsMatched.push(cardsOpened[0]);
	cardsMatched.push(cardsOpened[1]);
}

// Count moves
function movesCounter() {
	moves++;
	movesCount.innerHTML = moves + ' Moves';
}

function starRating() {
	if (moves <= 15) {
		// Rate 3 stars
	} else if (moves > 15 && moves <= 20) {
		rating = 2;
		star[0].style.visibility = 'hidden';
	} else {
		rating = 1;
		star[1].style.visibility = 'hidden';
	}
}

function starRatingByDefault() {
	rating = 3;
	star[0].style.visibility = 'visible';
	star[1].style.visibility = 'visible';
}

function play() {
	let cards = document.querySelectorAll('.card');
	cards.forEach(function(card) {
		card.addEventListener('click', function(evt) {
			// If cards aren't opened yet
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				// Check if timer is on
				if (timerCount === false) {
					startTimer();
			    }
				flipCardsToOpen(evt.target);
				cardsOpened.push(card);
				// If two cards are opened, check if they match
				if (cardsOpened.length === 2) { 
					movesCounter();
					// If both cards match
	 				if (cardsOpened[0].innerHTML === cardsOpened[1].innerHTML) {
						openedMatch(evt.target);
						cardsOpened = [];
						// If number of cards in cardsMatched is equal to number of cards in the inital array
						if (cardsMatched.length === listOfCards.length) {
						    stopTimer();
						    modalWinner();
						}
					} else {
						// If cards don't match flip them back after a short delay
						setTimeout(function() {
							cardsOpened.forEach(function(card) { // hide two opened cards
								card.classList.remove('open', 'show');
							});
							cardsOpened = [];
						}, 900);
					    // starRating();
					}
					starRating();
				}
			}
		});
	});
}

// Modal is based on https://www.w3schools.com/howto/howto_css_modals.asp
function modalWinner() {
	movesCounter();
	setTimeout(function modalPopUp() {
        modal.style.display = 'block';
    }, 30);
		modalMessage.innerHTML = ('You crossed the road without being smashed!');
	
	close.onclick = function() {
		modal.style.display = 'none';
		startGame();
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = 'none';
			startGame();
		}
	}
}

playAgain.addEventListener('click', function(evt) {
	modal.style.display = 'none';
	startGame();
});

startGame();