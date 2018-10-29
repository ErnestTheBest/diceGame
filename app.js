let scores, roundScore, activePlayer, isGamePlaying;
const diceImage1 = document.querySelector('.dice-1');
const diceImage2 = document.querySelector('.dice-2');
const rollButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const newGameButton = document.querySelector('.btn-new');
const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');
let scoreToWin = window.prompt('Set winning score', 'Enter number here');

initGame();

rollButton.addEventListener('click', function () {

    if (!isGamePlaying) { return }

    console.log('Clicked roll dice button.');

    const activeRoundScore = document.querySelector(`#current-${activePlayer}`);

    // 1. Random number
    let dice1 = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    console.log(dice1);

    // 2. Display the result
    diceImage1.src = `./diceImages/dice-${dice1}.png`;
    diceImage2.src = `./diceImages/dice-${dice2}.png`;
    diceImage1.style.display = 'block';
    diceImage2.style.display = 'block';

    // 3. Update the round score IF result != 1.
    switch (true) {
        case dice1 === dice2:
            lastRollDice = 0;
            nextPlayer();
            alert('You rolled double. Next player turn.');
            break;
        default:
            roundScore += dice1;
            roundScore += dice2;
            activeRoundScore.textContent = roundScore;
    }
});

holdButton.addEventListener('click', function () {

    if (!isGamePlaying) {
        return;
    }

    scores[activePlayer] += roundScore;
    activePlayer == 0 ? score0.textContent = scores[0] : score1.textContent = scores[1];
    if (scores[activePlayer] >= scoreToWin) {
        document.querySelector(`#name-${activePlayer}`).textContent = 'winner!';
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        hideDice();
        isGamePlaying = false;
    } else {
        nextPlayer();
    }
});

newGameButton.addEventListener('click', initGame);

function initGame() {
    isGamePlaying = true;
    hideDice();
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
    hideDice();
    current0.textContent = 0;
    current1.textContent = 0;
};

function hideDice() {
    diceImage1.style.display = 'none';
    diceImage2.style.display = 'none';
}









