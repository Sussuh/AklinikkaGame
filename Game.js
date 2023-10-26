const title = document.getElementById('title');
const startButton = document.getElementById('startbutton');
const container = document.querySelector('.container');
const scenes = document.querySelectorAll('.scene');
//const nextButtons = document.querySelectorAll('[id^="nextButton"]'); // Select all buttons with IDs starting with "nextButton"
//const images = document.querySelectorAll('[id^="image-"]'); // Select all images with IDs starting with "image-"
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const nextButton2 = document.getElementById('nextButton2'); // Add this line
const nextButton3 = document.getElementById('nextButton3');
const imageSources = ['Scene2.png', 'Scene ALT UI.jpg'];
const image = document.getElementById('image');



/*function showScene(sceneIndex) {
    scenes.forEach((scene, index) => {
        if (index === sceneIndex) {
            scene.classList.add('active');
        } else {
            scene.classList.remove('active');
        }
    });
}
function showNextImage() {
    currentSceneIndex++;
    if (currentSceneIndex < scenes.length) {
        showScene(currentSceneIndex);
    } else {
        currentSceneIndex = 0; // Wrap around to the first scene if there are no more scenes
        showScene(currentSceneIndex);
    }
}*/
// Add event listeners to the "Next" buttons to switch scenes
/*nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showNextImage();
    });
});*/

// Set the initial scene
//showScene(currentSceneIndex);


// Set initial scene
scenes[0].classList.add('active');

// Add event listeners
startButton.addEventListener('click', () => {
    title.style.display = 'none';
    startButton.style.display = 'none';
    scenes[0].classList.add('active');
});

btn1.addEventListener('click', () => {
    scenes[0].classList.remove('active');
    scenes[1].classList.add('active');
});

btn2.addEventListener('click', () => {
    scenes[0].classList.remove('active');
    scenes[2].classList.add('active');
});

// Add an event listener for the new "Next" button
nextButton2.addEventListener('click', () => {
    scenes[2].classList.remove('active');
    scenes[3].classList.add('active');
});
nextButton3.addEventListener('click', () => {
    scenes[3].classList.remove('active');
    scenes[4].classList.add('active');
});

const GAME_STATE = {
    START_SCENE: 0,
    SCENE1: 1,
    SCENE2: 2,
    SCENE3: 3,
    // Add more scenes as needed
  };
  
  let currentGameState = GAME_STATE.START_SCENE;

  function startGame() {
    const startButton = document.getElementById('startbutton');
    startButton.style.display = 'none'; // Hide the start button
  
    const title = document.getElementById('title');
    title.style.display = 'none'; // Hide the title
  
    const teksti = document.getElementById('teksti');
    teksti.innerHTML = 'Welcome to Scene 1'; // Update text
    teksti.style.display = 'block'; // Show text
  
    const valinnat = document.getElementById('valinnat');
    valinnat.style.display = 'block'; // Show buttons
  
    currentGameState = GAME_STATE.SCENE2; // Change game state
    const nextButton2 = document.getElementById('scene-2');
    nextButton2.style.display = 'block';
  }

  function updateImage() {
    image.src = imageSources[currentImageIndex];
}

// Add an event listener to the "Next" button
nextButton.addEventListener('click', () => {
    // Increment the image index or wrap around to the first image
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    
    // Update the image source
    updateImage();
});

// Set the initial image
updateImage();



  //const startButton = document.getElementById('startbutton');
//startButton.addEventListener('click', startGame);


//const startbutton = document.getElementById('startbutton'); <- Pitää tehä HTML tiedostoon ja CSS tiedostoon tyylittely
//var isGameStarted = false;


//function startGame() {
   // isGameStarted = true; //<- Tämä on tärkeä jotta peli ei käynnisty uudestaan jos pelaaja painaa start buttonia uudestaan
  //  currentState = data['Hukkaputki tarina'][0]; // <---- Tämä aloittaa tarinan alusta
  //  startbutton.style.display = "none";   // <---- Tämä piilottaa start buttonin kun peli on käynnissä
//}

//startButton.addEventListener('click', () => {
   // if (!isGameStarted) {
        //startGame();
   // }
//})

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
