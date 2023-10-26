'use strict';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const startButton = document.getElementById('start_btn');
const optionsButton = document.getElementById('options_button');
const questContainer = document.querySelector('.container');
let backgroundImage = new Image();
const scene1Container = document.getElementById('scene-1-container'); //
const scene1Image = document.getElementById('scene_1Image'); //
document.body.appendChild(canvas);

// Function to handle the transition to Scene 1
function transitionToScene1() {
  // Hide the initial content
  const canvasContainer = document.querySelector('.canvas-container');
  canvasContainer.style.display = 'none';

  // Show the Scene 1 content
  scene1Container.style.display = 'block';

  // Load and display the Scene 1 image
}

// Add an event listener to the "Start" button to transition to Scene 1
startButton.addEventListener('click', () => {
  transitionToScene1();
});

const scenes = {
  menu: () => {
    button1.style.display = 'none';
    button2.style.display = 'none';
    //questContainer.style.display = 'none'; // tämä poistaa scene 2 taustakuvan mutta jos se on päällä niin poistaa scene 1 taustakuvan???
    backgroundImage.src = 'images/starter.png';
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  },
  options: () => {},
  scene_1: () => {
    startButton.style.display = 'none';
    questContainer.style.display = 'none';
    backgroundImage.src = 'images/Scene_1.png';
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
    //scenes.menu();
    // Add an event listener to the "Start" button to switch to the next scene
    //startButton.addEventListener('click', () => {
    //scenes.scene_2();
    //});
  },

  scene_2: () => {},
};

let currentScene = 'menu';

function piirra() {
  scenes[currentScene]();
}

piirra();

// ----------------------TARINAN KULKU---------------------------------------------

fetch('Data/textdata.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Lataus Jsonfile epäonnistuu');
    }
    return response.json();
  })
  .then(data => {
    let currentState = data['Hukkaputki tarina'][0];
    let currentChoiceIndex = 0;

    function updateUI() {
      document.getElementById('btn1').innerText =
        currentState['valinnat'][0]['teksti'];
      document.getElementById('btn2').innerText =
        currentState['valinnat'][1]['teksti'];
      document.getElementById('teksti').innerText = currentState['teksti'];
    }

    updateUI();

    document.getElementById('btn1').addEventListener('click', function () {
      currentChoiceIndex = 0;
      nextState();
    });

    document.getElementById('btn2').addEventListener('click', function () {
      currentChoiceIndex = 1;
      nextState();
    });

    function nextState() {
      const nextID =
        currentState['valinnat'][currentChoiceIndex]['seuraava_id'];
      currentState = data['Hukkaputki tarina'].find(
        state => state['id'] === nextID
      );
    }
  });

//-------------------------------------------------------------------------------
