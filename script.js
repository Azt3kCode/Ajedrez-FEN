const FEN = document.getElementById('FEN');

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let position = urlParams.get('position') || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    FEN.innerHTML = position;
    buildChessboard();
    drawPieces(position);

    document.getElementById('chessForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPosition = formData.get('position');
        FEN.innerHTML = newPosition;
        redrawBoard(newPosition);
        updateURLParameter('position', newPosition);
    });
});

function buildChessboard() {
    const board = document.getElementById('board');
    const columnLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    // Limpiar el tablero antes de construirlo
    board.innerHTML = '';

    for (let i = 8; i >= 1; i--) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            const id = columnLetters[j] + i;
            square.id = id;
            square.className = (i + j) % 2 === 0 ? 'square white' : 'square black';
            board.appendChild(square);
        }
    }
}

function drawPieces(position) {
    const pieces = {
        'P': 'Blanco_Peon.png',
        'R': 'Blanco_Torre.png',
        'N': 'Blanco_Caballo.png',
        'B': 'Blanco_Alfil.png',
        'Q': 'Blanco_Dama.png',
        'K': 'Blanco_Rey.png',
        'p': 'Negro_Peon.png',
        'r': 'Negro_Torre.png',
        'n': 'Negro_Caballo.png',
        'b': 'Negro_Alfil.png',
        'q': 'Negro_Dama.png',
        'k': 'Negro_Rey.png'
    };

    const rows = position.split('/');
    const board = document.getElementById('board');
    let colIdx = 0;
    for (let i = 8; i >= 1; i--) {
        const row = rows[8 - i];
        for (let j = 0; j < row.length; j++) {
            const square = board.children[colIdx];
            const char = row[j];
            if (!isNaN(parseInt(char))) {
                colIdx += parseInt(char);
            } else {
                const pieceImg = document.createElement('img');
                pieceImg.className = 'piece';
                pieceImg.src = `assets/${pieces[char]}`;
                square.appendChild(pieceImg);
                colIdx++;
            }
        }
    }
}

function redrawBoard(newPosition) {
    buildChessboard();
    drawPieces(newPosition);
}

function updateURLParameter(param, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(param, value);
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    history.pushState({}, '', newUrl);
}
