/*
 * Create a list that holds all of your cards
 */
 const ListOfCards = ["fa-diamond", "fa-paper-plane-o", 
			   "fa-anchor", "fa-bolt", "fa-cube", 
			   "fa-leaf", "fa-bicycle", "fa-bomb", 
			   "fa-diamond", "fa-paper-plane-o", 
			   "fa-anchor", "fa-bolt", 
			   "fa-cube", "fa-leaf", 
			   "fa-bicycle", "fa-bomb"];

const numberOfPairs = ListOfCards.length / 2;

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

// Generate HTML for the element .card
function generateCard(card) {
	return `<li class="card"><i class="fa ${card}" data-card="${card}"></i></li>`;
};


function startGame() {
	const deck = document.querySelector('.deck');
	// const movesCounter = document.querySelector('.moves');
	const cardHTML = shuffle(ListOfCards).map(function(card) {
		return generateCard(card);
	});
	// moves = 0;
	deck.innerHTML = cardHTML.join('');
};

startGame();

let cardsOpen = [];
let cardsMatch = [];
const cards = document.querySelectorAll('.card');

// Open cards
function flipCardsToOpen(card) {
	card.classList.add('open', 'show');  
    // cardsOpen.push(card); 
};

// Close cards
// function flipCardsToClose(card) {
// 	card.classList.remove('open', 'show');  
//     // cardsOpen.push(card); 
// };

// two opened matched cards
function openedMatched(card) {
	cardsOpen[0].classList.add('match');
	cardsOpen[0].classList.remove('open');
	cardsOpen[0].classList.remove('show');
	cardsOpen[1].classList.add('match');
	cardsOpen[1].classList.remove('open');
	cardsOpen[1].classList.remove('show');
};

// Open cards on click
cards.forEach(function(card) {
	card.addEventListener('click', function(evt) {

		// If cards aren't opened yet
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {  
			 
			flipCardsToOpen(event.target);
			cardsOpen.push(card); 
		
			// If two cards are opened
			if (cardsOpen.length === 2) {

				// If cards match
				// if (cardsOpen[0].dataset.card == cardsOpen[1].dataset.card) {
				// if (cardsOpen[0].children[0].className === cardsOpen[1].children[0].className) {
				// 	console.log(cardsOpen[0].className);
				// 	openedMatched(event.target);  
				// 	cardsOpen = [];

				// } else {

					// If cards don't match
					setTimeout(function() {
						cardsOpen.forEach(function(card) { // hide two opened cards
							card.classList.remove('open', 'show');
						}); 
						cardsOpen = [];
					}, 1000);
				}

				// finish the game if # of match cards equals number of cards divided by two 
				// if (matchedCards.length == matchedPairs.length) {

				// If opened cards do not match close them
				// } else { 
				// }
			// }
		}
	});
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
