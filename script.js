const grid = document.querySelector('.grid-container');

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

function getCurrentShape(){
        const selectedShape = document.querySelector('.selected');
        return selectedShape;
    }

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
  }

function displayGridContent(){
    let shapeTypes = ['circle', 'square', 'triangle', 'rect'];
    let gridContent = "";

    for (let i = 0; i < 9; i++) {
        const randomNum = getRandomInt(0, 4); 
        gridContent += 
        `<div class="item">
            <div id="shape" class=${shapeTypes[randomNum]}></div>
        </div>`;
    }
    grid.innerHTML = gridContent;
}

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
    if (size === 'current'){
        shape.style.scale = '1';
    }
    if(size === 'small'){
        shape.style.scale = '0.5';
    }
  
    if(size === 'large'){
        shape.style.scale = '1.5';
    }
}