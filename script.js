const grid = document.querySelector('.grid-container');
const smallGrid = document.querySelector('.small-grid-container');
const COLOR_OPTIONS = ['red', 'blue', 'green', 'yellow'];
const SIZE_OPTIONS = ['small', 'large'];
const SHAPE_TYPES = ['circle', 'square', 'triangle', 'rect'];

document.addEventListener('DOMContentLoaded', function () {
    displayGridContent();
    generateColorOptions();
    generateSizeOptions();
    randomizeCSSProperties()
});

function displayGridContent() {
    let gridContent = "";
    let smallGridContent = "";

    for (let i = 0; i < 9; i++) {
        const randomNum = getRandomInt(0, 4);
        gridContent +=
            `<div class="item">
            <div id="shape" class=${SHAPE_TYPES[randomNum]}></div>
        </div>`;

        smallGridContent +=
            `<div class="item" >
            <div id="shape" class=${SHAPE_TYPES[randomNum]}></div>
        </div>`;
    }
    grid.innerHTML = gridContent;
    smallGrid.innerHTML = smallGridContent;
}

//Randomize Colors and Sizes
function randomizeCSSProperties() {
    const gridShapes = document.querySelectorAll('.grid-container .item div');
    const smallGridShapes = document.querySelectorAll('.small-grid-container .item div');

    for (let i = 0; i < gridShapes.length; i++) {
        const randomColor = COLOR_OPTIONS[getRandomInt(0, 4)];
        const randomSize = SIZE_OPTIONS[getRandomInt(0, 3)];

        gridShapes[i].style.backgroundColor = randomColor;
        changeShapeSize(gridShapes[i], randomSize);
    }

    for (let i = 0; i < gridShapes.length; i++) {
        const randomColor = COLOR_OPTIONS[getRandomInt(0, 4)];
        const randomSize = SIZE_OPTIONS[getRandomInt(0, 3)];

        smallGridShapes[i].style.backgroundColor = randomColor;
        changeShapeSize(smallGridShapes[i], randomSize);
    }
}

//Check the colors and sizes of each shape in the grid and small grid
function isGridShapesEqual() {
    console.log('Checking if shapes are equal');

    const gridShapes = document.querySelectorAll('.grid-container .item div');
    const smallGridShapes = document.querySelectorAll('.small-grid-container .item div');
    const alert = document.getElementById('alert');

    for (let i = 0; i < gridShapes.length; i++) {
        if (gridShapes[i].className !== smallGridShapes[i].className) {
            alert.innerHTML = 'Shape class name not equal';
            alert.style.display = "block";
            return false;
        } else if (gridShapes[i].style.backgroundColor !== smallGridShapes[i].style.backgroundColor) {
            console.log('Shape color not equal');
            return false;
        } else if (gridShapes[i].style.scale !== smallGridShapes[i].style.scale) {
            console.log('Shape size not equal');
            return false;
        }
    }
    alert('You win!');
    return true;
}

document.addEventListener('click', function (event) {
    const movesCounter = document.getElementById('movesCounter');

    if (event.target.id === 'shape') {
        console.log("You clicked a shape!");
        movesCounter.innerHTML = parseInt(movesCounter.innerHTML) + 1;
        const currShape = event.target;

        document.querySelectorAll('select').forEach((select) => {
            select.selectedIndex = 0;
        });


        const allShapes = document.querySelectorAll('.item div');
        allShapes.forEach((shape) => {
            shape.classList.remove('selected');
        });

        currShape.classList.add('selected');
        removeDisabled();
    }
});

document.addEventListener('change', function (event) {
    const size = event.target.value;
    if (event.target.id === 'size-list') {
        console.log('size', size);
        changeShapeSize(getCurrentShape(), size);
    }

    const color = event.target.value;
    if (event.target.id === 'color-list') {
        console.log('color', color);
        changeShapeColor(getCurrentShape(), color);
    }
});


function removeDisabled() {
    const removeDisable = document.querySelectorAll('select');
    removeDisable.forEach((select) => {
        select.removeAttribute('disabled');
    });
}

function changeShapeColor(shape, color) {
    shape.style.backgroundColor = color;
}

function changeShapeSize(shape, size) {

    if (size === 'small') {
        shape.style.scale = '0.7';
    }

    if (size === 'large') {
        shape.style.scale = '1.5';
    }
}


function generateColorOptions() {
    console.log('color', COLOR_OPTIONS);
    const colorList = document.getElementById('color-list');

    console.log('colorList', colorList);

    for (let i = 0; i < COLOR_OPTIONS.length; i++) {
        console.log('color', COLOR_OPTIONS[i]);
        let colorOption = document.createElement('option');
        colorOption.value = COLOR_OPTIONS[i];
        colorOption.innerHTML = COLOR_OPTIONS[i];
        colorList.appendChild(colorOption);
    }
}

function generateSizeOptions() {
    console.log('size', SIZE_OPTIONS);
    const sizeList = document.getElementById('size-list');

    for (let i = 0; i < SIZE_OPTIONS.length; i++) {
        let sizeOption = document.createElement('option');
        sizeOption.value = SIZE_OPTIONS[i];
        sizeOption.innerHTML = SIZE_OPTIONS[i];
        sizeList.appendChild(sizeOption);
    }
}

//Helper functions
function getCurrentShape() {
    const selectedShape = document.querySelector('.selected');
    return selectedShape;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
