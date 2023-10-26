'use strict';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const startButton = document.getElementById('start_btn');
const optionsButton = document.getElementById('options_button');
const questContainer = document.querySelector('.container');
let backgroundImage = new Image();
document.body.appendChild(canvas);

const scenes = {
  menu: () => {
    button1.style.display = 'none';
    button2.style.display = 'none';
    questContainer.style.display = 'none';
    backgroundImage.src = 'images/starter.png';
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  },
  options: () => {},
  scene_1: () => {},
  scene_2: () => {},
};

let currentScene = 'menu';

function piirrä() {
  scenes[currentScene]();
}

piirrä();

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
