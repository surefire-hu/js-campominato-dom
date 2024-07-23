const generateGridButton = document.getElementById('generateGrid');
const difficultySelect = document.getElementById('difficulty');
const gridContainer = document.getElementById('grid');

generateGridButton.addEventListener('click', generateGrid);

let bombPositions;
let cells;
let clickCount;
// scelta difficoltà
function generateGrid() {
    const difficulty = parseInt(difficultySelect.value);
    let size, totalCells, bombCount;

    switch (difficulty) {
        case 1:
            size = 7;
            totalCells = 49;
            bombCount = 10;
            break;
        case 2:
            size = 9;
            totalCells = 81;
            bombCount = 15;
            break;
        case 3:
            size = 10;
            totalCells = 100;
            bombCount = 20;
            break;
    }
// cancello html per evitare di aggiungere altre
    gridContainer.innerHTML = '';
    gridContainer.style.width = `${size * 52}px`;  

    
    bombPositions = generateBombPositions(totalCells, bombCount);
    cells = [];
    clickCount = 0;
    updateClickCounter();
// creare un div per ogni cella
    for (let i = 1; i <= totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = `<h3>${i}</h3>`;
        cell.addEventListener('click', () => handleCellClick(i));
        gridContainer.appendChild(cell);
        cells.push(cell);
    }
}
// creare bombe in posizioni random
function generateBombPositions(totalCells, bombCount) {
    const positions = [];
    while (positions.length < bombCount) {
        const position = Math.floor(Math.random() * totalCells) + 1;
        if (!positions.includes(position)) {
            positions.push(position);
        }
    }
    return positions;
}

// contatore di click e controllo bombe
function handleCellClick(cellNumber) {
    const clickedCell = cells[cellNumber - 1];
    if (clickedCell.classList.contains('clicked')) {
        return; 
    }

    if (bombPositions.includes(cellNumber)) {
        revealAllBombs();
        alert('Boom! Hai colpito una bomba. Game Over!' + `hai fatto ${clickCount} click prima della bomba`);
    } else {
        clickedCell.style.backgroundColor = 'lightcoral';
        clickedCell.classList.add('clicked');
        console.log(`Cella cliccata: ${cellNumber}`);
        clickCount++;
        updateClickCounter();
    }
}
// rivela tutte le bombe dopo esplosione
function revealAllBombs() {
    bombPositions.forEach(bombPosition => {
        const bombCell = cells[bombPosition - 1];
        bombCell.style.backgroundColor = 'red';
        bombCell.innerHTML = '<h3>💣</h3>';
    });
}
function updateClickCounter() {
    console.log( `Numero di click: ${clickCount}`);
}
