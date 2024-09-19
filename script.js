const grid = document.querySelector('.grid-container');
const COLOR_OPTIONS = ['red', 'blue', 'green', 'yellow'];
const SIZE_OPTIONS = ['small', 'normal', 'large'];
const SHAPE_TYPES = ['circle', 'square', 'triangle', 'rect'];

document.addEventListener('DOMContentLoaded', function() {
    displayGridContent(); 
    generateColorOptions();
    generateSizeOptions();
});
    
function displayGridContent(){
    let gridContent = "";

    for (let i = 0; i < 9; i++) {
        const randomNum = getRandomInt(0, 4); 
        gridContent += 
        `<div class="item">
            <div id="shape" class=${SHAPE_TYPES[randomNum]}></div>
        </div>`;
    }
    grid.innerHTML = gridContent;
}

document.addEventListener('click', function(event) {
    if (event.target.id === 'shape') {
    const currShape = event.target;
    console.log("You clicked a shape!");

    const allShapes = document.querySelectorAll('.item div');
    allShapes.forEach((shape) => {
        shape.classList.remove('selected');
    });

    currShape.classList.add('selected');
    removeDisabled();
    }
  });

  document.addEventListener('change', function(event) {
    const size = event.target.value;
    if(event.target.id === 'size-list'){
        console.log('size', size);
        changeShapeSize(getCurrentShape(), size);
    }

    const color = event.target.value;
    if(event.target.id === 'color-list'){
        console.log('color', color);
        changeShapeColor(getCurrentShape(), color);
    }
});


function removeDisabled(){
    const removeDisable = document.querySelectorAll('select');
    removeDisable.forEach((select) => {
        select.removeAttribute('disabled');
    });
}

function changeShapeColor(shape, color){
    shape.style.backgroundColor = color;
}

function changeShapeSize(shape, size){
    if (size === 'normal'){
        shape.style.scale = '1';
    }
    if(size === 'small'){
        shape.style.scale = '0.5';
    }
  
    if(size === 'large'){
        shape.style.scale = '1.5';
    }
}


function generateColorOptions(){
    console.log('color', COLOR_OPTIONS);
    const colorList = document.getElementById('color-list');

    console.log('colorList', colorList);

    for (let i = 0; i < COLOR_OPTIONS.length; i++){
        console.log('color', COLOR_OPTIONS[i]);
        let colorOption = document.createElement('option');
        colorOption.value = COLOR_OPTIONS[i];
        colorOption.innerHTML = COLOR_OPTIONS[i];
        colorList.appendChild(colorOption);
    }
}

function generateSizeOptions(){
    console.log('size', SIZE_OPTIONS);  
    const sizeList = document.getElementById('size-list');

    for (let i = 0; i < SIZE_OPTIONS.length; i++){
        let sizeOption = document.createElement('option');
        sizeOption.value = SIZE_OPTIONS [i];
        sizeOption.innerHTML = SIZE_OPTIONS [i];
        sizeList.appendChild(sizeOption);
    }
}

//Helper functions
function getCurrentShape(){
    const selectedShape = document.querySelector('.selected');
    return selectedShape;
}

function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min; 
}
