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
                showArt();
        }

    }, 1000);
});

const API_KEY = "091c05d7-45fb-48d6-a693-0dfae5f7971d"
async function showArt(){
    try{
        const page = Math.floor(Math.random()* 100) + 1;
        const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&hasimage=1&size=1&page=${page}`;

        const res = await fetch (url);
        const data = await res.json();


        const obra = data.records[0];
        const title = obra.title || "Obra without title";
        const artist = obra.people?.[0]?.name || "Artist unknown";
        const date = obra.dated || "Date unkown";
        const image = obra.primaryimageurl;

        document.getElementById("art").innerHTML = `
        <p> Talking about time... Do you know that in <strong>${date}</strong> the artist <em>"${artist}"</em> made this picture?</p>
        <h3>${title}</h3>
        
        ${image ? `<img src="${image}" alt="${title}">` : "<p>(Sorry, there isn't a picture to show in this case)</p>"}
        `;
    } catch (err) {
        console.error("Error to get the obra:", err);
        document.getElementById("art").textContent = "No se cargo la obra de arte";
    }
}
