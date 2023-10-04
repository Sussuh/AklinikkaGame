//const startbutton = document.getElementById('startbutton'); <- Pitää tehä HTML tiedostoon ja CSS tiedostoon tyylittely
var isGameStarted = false;


function startGame() {
    isGameStarted = true; //<- Tämä on tärkeä jotta peli ei käynnisty uudestaan jos pelaaja painaa start buttonia uudestaan
    currentState = data['Hukkaputki tarina'][0]; // <---- Tämä aloittaa tarinan alusta
    startbutton.style.display = "none";   // <---- Tämä piilottaa start buttonin kun peli on käynnissä
}

startButton.addEventListener('click', () => {
    if (!isGameStarted) {
        startGame();
    }
})

fetch('Data/textdata.json')  // Haetaan JSON databasesta sisältä toiminnolla fetch('tiedostonnimi_tyyppi')
    .then(response => response.json())
    .then(data => {
        let currentState = data['Hukkaputki tarina'][0];        // Nimetään indexit jotta pysytään mukana missä kohtaa tarinaa mennään
        let currentChoiceIndex = 0;

        function updateUI() {      // UIn päivityksen Implementointi
            document.getElementById('btn1').innerText = currentState['valinnat'][0]['teksti'];
            document.getElementById('btn2').innerText = currentState['valinnat'][1]['teksti'];
            document.getElementById('teksti').innerText = currentState['teksti'];
        }


        updateUI();        // Päivitetään UI!


        document.getElementById('btn1').addEventListener('click', function() {
            currentChoiceIndex = 0;
            nextState();
        });        // Lisätään eventti tapahtuma buttoneille "click"

        document.getElementById('btn2').addEventListener('click', function() {
            currentChoiceIndex = 1;
            nextState();
        });


        function nextState() {        // Functionaalisuus pelaajan valintaan liittyen mihin suuntaan tarinaa jatketaan
            const nextID = currentState['valinnat'][currentChoiceIndex]['seuraava_id'];
            currentState = data['Hukkaputki tarina'].find(state => state['id'] === nextID);
            if (currentState) {
                updateUI();
            } else {

                alert('The story has ended.');             // Tarinan päätökseen liittyvät seikat
            }   
        }
});
