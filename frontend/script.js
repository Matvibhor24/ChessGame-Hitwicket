let playerId = 'player1';
let selectedCharacter = null;
let selectedPosition = null;
let gameState = {
    currentTurn: 'player1',
    board: [
        ['A-P1', 'A-H1', 'A-H2', 'A-P2', 'A-P3'],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        ['B-P1', 'B-H1', 'B-H2', 'B-P2', 'B-P3']
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    updateGameBoard();

    // Handle board click event
    document.getElementById('game-board').addEventListener('click', (event) => {
        if (event.target.classList.contains('cell') && event.target.textContent) {
            selectCharacter(event.target.textContent, event.target.dataset.position);
        }
    });
});

function updateGameBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    gameState.board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.position = `${i}-${j}`; // Store the position data

            if (cell) {
                cellDiv.textContent = cell;

                if (cell.startsWith('A-')) {
                    cellDiv.classList.add('player1');
                } else if (cell.startsWith('B-')) {
                    cellDiv.classList.add('player2');
                }
            } else {
                cellDiv.classList.add('empty');
            }

            board.appendChild(cellDiv);
        });
    });

    // Update turn indicator
    document.getElementById('turn-indicator').textContent = `Turn: ${gameState.currentTurn}`;

    // Clear move buttons
    document.getElementById('move-buttons').innerHTML = '';
}

function selectCharacter(character, position) {
    const [row, col] = position.split('-').map(Number);

    selectedCharacter = character;
    selectedPosition = { row, col };

    const moveButtons = document.getElementById('move-buttons');
    moveButtons.innerHTML = '';

    const moves = getValidMoves(character);

    moves.forEach(move => {
        const button = document.createElement('button');
        button.textContent = move;
        button.addEventListener('click', () => makeMove(character, move));
        moveButtons.appendChild(button);
    });
}

function getValidMoves(character) {
    if (character.includes('P')) {
        return ['L', 'R', 'F', 'B'];
    } else if (character.includes('H1')) {
        return ['L', 'R', 'F', 'B'];
    } else if (character.includes('H2')) {
        return ['FL', 'FR', 'BL', 'BR'];
    }
    return [];
}

function makeMove(character, move) {
    let { row, col } = selectedPosition;

    switch (move) {
        case 'L':
            col -= 1;
            break;
        case 'R':
            col += 1;
            break;
        case 'F':
            row -= 1;
            break;
        case 'B':
            row += 1;
            break;
        case 'FL':
            row -= 2;
            col -= 2;
            break;
        case 'FR':
            row -= 2;
            col += 2;
            break;
        case 'BL':
            row += 2;
            col -= 2;
            break;
        case 'BR':
            row += 2;
            col += 2;
            break;
    }

    // Ensure the move stays within bounds
    if (row < 0 || row >= 5 || col < 0 || col >= 5) {
        alert('Move out of bounds!');
        return;
    }

    // Update the game state
    gameState.board[selectedPosition.row][selectedPosition.col] = null; // Clear the old position
    gameState.board[row][col] = character; // Set the new position

    // Switch turns
    gameState.currentTurn = gameState.currentTurn === 'player1' ? 'player2' : 'player1';

    updateGameBoard();
    selectedCharacter = null;
    selectedPosition = null;
}
