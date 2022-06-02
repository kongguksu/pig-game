'use strict';

////// Defining variables
let playing, score, currentScore, activePlayer;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const currrent1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

////// Defining function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

////// Initial state function
const init = function () {
  // Game
  playing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  // UI
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  currrent1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

////// User rolls dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generat random dice roll: 1 - 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display dice roll (UI)
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // Is dice === 1 or not?
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      // Display new current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

////// User holds score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    score[activePlayer] += currentScore;
    // Display total score
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // Is score >= 100 or not?
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

////// User resets game
btnNew.addEventListener('click', init);
