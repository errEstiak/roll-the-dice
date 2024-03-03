'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // we can also use getelement by id to select id

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; // setting variables as global so that it can be used everywhere

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active'); // player 1 should always be the current player
  player1El.classList.remove('player--active');

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
};

init(); // ======== this function should always run, when the page load ========


// =========== switching to next player function ===========
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ============================ Rolling the dice ============================
btnRoll.addEventListener('click', function () {
  if (playing) {
    // ============= this click function will only work while the playing value is true =============
    // 1. Generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    // Checking if score is more than 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    } else {
      // switch the palyer
      switchPlayer();
    }
  }
});

// ============================ Holding the score ============================
btnHold.addEventListener('click', function () {
  if (playing) {
    // ============= this click function will only work while the playing value is true =============
    // 1. add current score to active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if active player score >= 100
    // active player win
    if (scores[activePlayer] >= 20) {
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false; // ======== for the first time we are setting the playing value false if someone win ========
    } else {
      // 3. Swtich player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
