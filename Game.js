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
})
