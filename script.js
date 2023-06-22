'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const p0Score = document.querySelector('#score--0');
//we can select id by using getElementById
const p1Score = document.getElementById('score--1');

const p0CurrentScore = document.getElementById('current--0');
const p1CurrentScore = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const newlBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//store current score
let currentScore = 0;
let activePlayer = 0;
const scores =[0,0];


p0Score.textContent = 0;
p1Score.textContent = 0;
dice.classList.add('hidden');

rollBtn.addEventListener('click', function(){
  dice.classList.remove('hidden');
  
  const randomDice = Math.trunc (Math.random() * 6) + 1;
  console.log(randomDice);
  dice.src = `img/dice-${randomDice}.png`

  if(randomDice !== 1){
    currentScore += randomDice;
    // p0CurrentScore.textContent = currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }
  else{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
})


