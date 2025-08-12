
// const cube = document.getElementById('cube');
const button = document.getElementById('diceButton');
const quoteBox = document.getElementById('quoteBox');
const diceCountSelect = document.getElementById('diceCount');
const diceContainer = document.getElementById('diceContainer');

function rollDice(){

    const cubes = document.querySelectorAll('.cube');

    cubes.forEach(cube => {  
        const face = Math.floor(Math.random() * 6) + 1;
    
        let xRotation = 0;
        let yRotation =0;

        switch (face) {
            case 1: xRotation = 0; yRotation = 0; break;
            case 2: xRotation = -90; yRotation = 0; break;
            case 3: xRotation = 0; yRotation = -90; break;
            case 4: xRotation = 0; yRotation = 90; break;
            case 5: xRotation = 90; yRotation = 0; break;
            case 6: xRotation = 0; yRotation = 180; break;
            
        }
            const extraX = 360 *(Math.floor(Math.random() * 4) + 1);
            const extraY = 360 *(Math.floor(Math.random() * 4) + 1);
        
            cube.style.transform = `rotateX(${xRotation + extraX}deg) rotateY(${yRotation + extraY}deg)`;


    });


}
button.addEventListener("click", rollDice);


function createDice(count){
    const template = document.getElementById('cube');

    diceContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const newCube = template.cloneNode(true);
        newCube.id = '';
        newCube.style.display = 'block';
        newCube.style.transform = 'rotateX(0deg) rotateY(0deg)';
        diceContainer.appendChild(newCube);
    }
}


diceCountSelect.addEventListener('click', (e)=>{
    const count = parseInt(e.target.value);
    createDice(count);
});

   createDice(1);
       
  

