const words = ['block', 'creep', 'stone', 'grass', 'apple']; // Liste de mots
let currentWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;

document.getElementById('submit-btn').addEventListener('click', submitWord);
document.getElementById('new-game-btn').addEventListener('click', startNewGame);

function submitWord() {
    const input = document.getElementById('word-input').value.toLowerCase();
    if (input.length !== 5) {
        showMessage('Le mot doit contenir 5 lettres.');
        return;
    }

    attempts++;
    updateGrid(input);
    if (input === currentWord) {
        showMessage('Gagné! Bravo!');
        document.getElementById('new-game-btn').style.display = 'block';
    } else if (attempts >= 6) {
        showMessage(`Perdu! Le mot était : ${currentWord}`);
        document.getElementById('new-game-btn').style.display = 'block';
    } else {
        document.getElementById('word-input').value = '';
    }
}

function updateGrid(word) {
    const grid = document.getElementById('grid');
    const row = document.createElement('div');
    for (let i = 0; i < word.length; i++) {
        const letterBlock = document.createElement('div');
        letterBlock.textContent = word[i];

        if (word[i] === currentWord[i]) {
            letterBlock.classList.add('green');
        } else if (currentWord.includes(word[i])) {
            letterBlock.classList.add('yellow');
        } else {
            letterBlock.classList.add('gray');
        }

        row.appendChild(letterBlock);
    }
    grid.appendChild(row);
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}

function startNewGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    attempts = 0;
    document.getElementById('grid').innerHTML = '';
    document.getElementById('word-input').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('new-game-btn').style.display = 'none';
}
