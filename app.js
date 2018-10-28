/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, isGamePlaying;
const diceImage = document.querySelector('.dice');
const rollButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const newGameButton = document.querySelector('.btn-new');
const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');

initGame();
if (isGamePlaying) {

    rollButton.addEventListener('click', function () {

        console.log('Clicked roll dice button.');

        const activeRoundScore = document.querySelector(`#current-${activePlayer}`);

        // 1. Random number
        let dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice);

        // 2. Display the result
        diceImage.src = `./diceImages/dice-${dice}.png`;
        diceImage.style.display = 'block';

        // 3. Update the round score IF result != 1.
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            activeRoundScore.textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
            alert('You rolled 1. Next player turn.')
        }
    });

    holdButton.addEventListener('click', function () {

        scores[activePlayer] += roundScore;
        activePlayer == 0 ? score0.textContent = scores[0] : score1.textContent = scores[1];
        if (scores[activePlayer] >= 50) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'winner!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            diceImage.style.display = 'none';
            isGamePlaying = false;
        } else {
            nextPlayer();
        }
    });
};

newGameButton.addEventListener('click', initGame);

function initGame() {
    isGamePlaying = true;
    diceImage.style.display = 'none';
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector(`#name-0`).textContent = 'Player 1';
    document.querySelector(`#name-1`).textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceImage.style.display = 'none';
    current0.textContent = 0;
    current1.textContent = 0;
};










