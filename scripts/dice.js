
const cube = document.getElementById('cube');
const button = document.getElementById('diceButton');

button.addEventListener('click', ()=>{
    if (button){
        cube.style.animation = "rotate 1s infinite linear";
        

    }

    fetch("https://www.randomnumberapi.com/api/v1.0/random?min=1&max=6&count=1")
        .then(res => res.json())
        .then(data => {
            const number = data[0];
            
            setTimeout(()=>{
                const rotation =getRotationForNumber(number);
                cube.style.transform = rotation;
            },2000);
        });



    });

    function getRotationForNumber(num){
        switch(num){
            case 1: return "rotateY(0deg) translateZ(100px)";
            case 2: return "rotateY(180deg) translateZ(100px)";
            case 3: return "rotateY(90deg) translateZ(100px)";
            case 4: return "rotateY(-90deg) translateZ(100px)";
            case 5: return "rotateX(90deg) translateZ(100px)";
            case 6: return "rotateX(-90deg) translateZ(100px)";
        }
    }