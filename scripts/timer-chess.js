const buttonStart = document.getElementById('StartBtn');
const quoteBox = document.getElementById('quoteBox');
const timer1Display = document.getElementById('timer1');
const timer2Display = document.getElementById('timer2');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const soundmp3 = new Audio('/public/sounds/switch.mp3');


let time1 = 0;
let time2 = 0;
let interval1 = null;
let interval2 = null;

function updateDisplay(){
    document.getElementById('timer1').textContent = time1 > 0 ? formatTime(time1) : "TIME OUT";
    document.getElementById('timer2').textContent = time2 > 0 ? formatTime(time2) : "TIME OUT";
   
}


function stopAll(){
    clearInterval(interval2);
    clearInterval(interval1);
}

function startTurn1(){
    clearInterval(timer2);

    timer1 = setInterval(() => {
    if (time1 > 0) {
        time1--;
        updateDisplay();
        } else {
            clearInterval(timer1);
            document.getElementById('timer1').textContent = "TIME OUT";
        }
    
      
    }, 1000);
}


function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const minsStr = mins.toString().padStart(2, '0');
    const secsStr = secs.toString().padStart(2, '0');

    return `${minsStr}:${secsStr}`;
}


function startTurn2(){
    clearInterval(timer1);

    timer2 = setInterval(() => {
    if (time2 > 0) {
        time2--;
        updateDisplay();
        } else {
            clearInterval(timer2);
            document.getElementById('timer2').textContent = "TIME OUT";
        }
    
      
    }, 1000);
}

buttonStart.addEventListener('click', ()=>{
    const selectedMinutes = parseInt(document.getElementById('InitialTime').value);
    const initialTime = selectedMinutes * 60;


    if (isNaN(initialTime) || initialTime <=0) return;


    time1 = initialTime;
    time2 = initialTime;
    updateDisplay();
    startTurn1();

    button1.classList.add('active-turn');
    button2.classList.remove('active-turn');

});


button1.addEventListener('click', () => {
    if (time1 > 0){
        startTurn2();
        button2.classList.add('active-turn');
        button1.classList.remove('active-turn');
        soundmp3.play();
        showAdvice();
    }
});

button2.addEventListener('click', () => {
    if (time2 > 0){
        startTurn1();
        button1.classList.add('active-turn');
        button2.classList.remove('active-turn');
        soundmp3.play();
        showAdvice();
    }
});




async function showAdvice(){
    try{
        const res = await fetch ('https://api.adviceslip.com/advice');
        const data = await res.json();
        const advice = data.slip.advice;
        
        document.getElementById("advice").innerHTML = `
        <p>A life tip for you: <em>"${advice}"</em></p>
        
        `;
    } catch (err) {
        console.error("Error to get the obra:", err);
        document.getElementById("art").textContent = "No se cargo la obra de arte";
    }
}