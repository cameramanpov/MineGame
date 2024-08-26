const blocks = ['red', 'blue', 'green', 'yellow', 'black', 'white']; // Liste de blocs
let currentCombination = [];
let userCombination = [];
let attempts = 0;

// Générer une combinaison aléatoire de 6 blocs
function generateCombination() {
    currentCombination = [];
    for (let i = 0; i < 6; i++) {
        const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
        currentCombination.push(randomBlock);
    }
}

generateCombination();

// Afficher les boutons pour chaque bloc
const blockButtonsContainer = document.getElementById('block-buttons');
blocks.forEach(block => {
    const button = document.createElement('button');
    button.className = block;
    button.addEventListener('click', () => addBlockToUserCombination(block));
    blockButtonsContainer.appendChild(button);
});

function addBlockToUserCombination(block) {
    if (userCombination.length < 6) {
        userCombination.push(block);
        updateGrid();
    }
}

function updateGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear previous content
    userCombination.forEach(block => {
        const blockDiv = document.createElement('div');
        blockDiv.className = block;
        grid.appendChild(blockDiv);
    });
}

document.getElementById('submit-btn').addEventListener('click', submitCombination);
document.getElementById('new-game-btn').addEventListener('click', startNewGame);

function submitCombination() {
    if (userCombination.length !== 6) {
        showMessage('Sélectionnez 6 blocs.');
        return;
    }

    attempts++;
    checkCombination();
    if (userCombination.join('') === currentCombination.join('')) {
        showMessage('Gagné! Bravo!');
        document.getElementById('new-game-btn').style.display = 'block';
    } else if (attempts >= 6) {
        showMessage(`Perdu! La combinaison était : ${currentCombination.join(', ')}`);
        document.getElementById('new-game-btn').style.display = 'block';
    } else {
        userCombination = [];
        updateGrid();
    }
}

function checkCombination() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < userCombination.length; i++) {
        const blockDiv = grid.children[i];
        if (userCombination[i] === currentCombination[i]) {
            blockDiv.classList.add('green');
        } else if (currentCombination.includes(userCombination[i])) {
            blockDiv.classList.add('yellow');
        } else {
            blockDiv.classList.add('gray');
        }
    }
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}

function startNewGame() {
    generateCombination();
    userCombination = [];
    attempts = 0;
    document.getElementById('grid').innerHTML = '';
    document.getElementById('message').textContent = '';
    document.getElementById('new-game-btn').style.display = 'none';
}
