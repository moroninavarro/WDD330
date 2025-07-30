const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');

const timeLeft = document.getElementById('timeLeft');

startButton.addEventListener('click', ()=>{
    let time = parseInt(timeLeft.value);

    if (isNaN(time) || time < 0){
        countdownDisplay.textContent= "Please set a number";
        return;
    }

    const interval = setInterval(()=>{
        if (time >= 0) {
            countdownDisplay.textContent = time;
            time--;
        } else {
            clearInterval(interval);
                countdownDisplay.textContent = "¡Time Out!";
            
        }

    }, 1000);
});