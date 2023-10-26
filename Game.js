'use strict';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const startButton = document.getElementById('start_btn');
const optionsButton = document.getElementById('options_button');
const questContainer = document.getElementById('questContainer');
const kieliYksi = document.getElementById('Kielivaihtoehto1');
const kieliKaksi = document.getElementById('Kielivaihtoehto2');
let backgroundImage = new Image();
document.body.appendChild(canvas);

//--------------------------------------Scenet
const scenes = {
  menu: () => {
    backgroundImage.src = 'images/starter.png';
    button1.style.display = 'none';
    button2.style.display = 'none';
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  },
  scene_1: () => {
    backgroundImage.src = 'images/Scene_2.png';
    startButton.style.display = 'none';
    kieliYksi.style.display = 'none';
    kieliKaksi.style.display = 'none';
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  },
  scene_2: () => {},
};

//---------------------------------------------------------

//-------------------Scenen vaihto Start buttonista------------

let currentScene = 'menu';

startButton.addEventListener('click', function () {
  const nextSceneName = getNextSceneName(currentScene);
  if (scenes[nextSceneName]) {
    currentScene = nextSceneName;
    piirrä();
  } else {
    console.log('Ei ole uusia scenejä.');
  }
});

function getNextSceneName(currentSceneName) {
  switch (currentSceneName) {
    case 'menu':
      return 'scene_1';
    case 'scene_1':
      return 'scene_2';
    default:
      return currentScene;
  }
}

function piirrä() {
  scenes[currentScene]();
}

piirrä();
//---------------------------------------------------------------------

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
