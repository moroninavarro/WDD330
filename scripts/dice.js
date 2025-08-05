
//const cube = document.getElementById('cube');
const button = document.getElementById('diceButton');
const quoteBox = document.getElementById('quoteBox');
const diceCountSelect = document.getElementById('diceCount');
const diceContainer = document.getElementById('diceContainer');

let isRolling = false;
let diceStates= [];
// let currentX = 0;
// let currentY = 0;

function getRotationForNumber(number){
    switch(number){
        case 1: return {x: 0, y: 0 };
        case 2: return {x: 0, y: 180 };
        case 3: return {x: 0, y: -90 };
        case 4: return {x: 0, y: 90 };
        case 5: return {x: -90, y: 0 };
        case 6: return {x: 90, y: 0 };
    }
}

function createDice(count){
    diceContainer.innerHTML = '';
    diceStates = [];

    for (let i =0; i < count; i++){
        const cube = document.createElement('div');
        cube.className = 'cube';

        ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach((face, idx)=>{
            const faceDiv = document.createElement('div');
            faceDiv.className = 'face ' + face;
            faceDiv.textContent = idx + 1;
            cube.appendChild(faceDiv);
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'scene';
        wrapper.appendChild(cube);
        diceContainer.appendChild(wrapper);

        diceStates.push({cube, currentX: 0, currentY: 0});
    }
}

button.addEventListener('click', ()=>{
    if (isRolling) return;
    isRolling = true;
    
    fetch('https://favqs.com/api/qotd')
        .then(res => res.json())
        .then(data => {
            const quote = data.quote.body;
            const author = data.quote.author;
            quoteBox.textContent = `"${quote}" - ${author}`;
    })
    .catch(error => {
        quoteBox.textContent = "There is an error with the quote";
        console.error('Error', error);
        });
    

    diceStates.forEach((state)=> { 
        
        const number = Math.floor(Math.random() * 6) + 1;
        const adjustment = getRotationForNumber(number);
        const fastSpin = 4 * 360;
        
        state.currentX += fastSpin + adjustment.x;
        state.currentY += fastSpin +  adjustment.y;
        
        state.cube.style.transition = "transform 2s ease-out"; 
        state.cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

     });


    // const computedStyle = window.getComputedStyle(cube);
    // const matrix = computedStyle.transform;


    // cube.style.animation = "none";
    // cube.style.transform = matrix;
    
    setTimeout(() => {
        isRolling = false;
        diceStates.forEach(({cube})=> {
        cube.style.transition = "none";
        });
    }, 2300);
    });

    diceCountSelect.addEventListener('change', (e)=>{
        const count = parseInt(e.target.value);
        createDice(count);
    });


   createDice(1);
       
    //});
