'use strict';

//selecting elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--acive');
  player2.classList.remove('player--acive');
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
init();

// rolling the dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1-generate a randon dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2-display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3- check for rolled=1 if true
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player1.classList.toggle('player--active');
      // player2.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to active player score
    scores[activePlayer] += currentScore;
    //   scores[1] = scores[1] = currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.chek player score is >= 100
    if (scores[activePlayer] >= 100) {
      // 3.finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--acive');
    } else {
      // 4.switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
// function () {
//   playing = true;
//   diceEl.classList.add('hidden');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   document.querySelector(`.player--0`).classList.add('player--acive');
//   document.getElementById(`score--0`).textContent = 0;
//   document.getElementById(`score--1`).textContent = 0;
//   document.getElementById(`current--0`).textContent = 0;
//   document.getElementById(`current--1`).textContent = 0;
//   scores[activePlayer] = 0;
