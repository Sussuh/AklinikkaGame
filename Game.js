'use strict';
const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');
const chooseButtons = document.querySelector('.btn-grid');
const startButton = document.querySelector('#start_btn');
const optionsButton = document.querySelector('#options_button');
const questBox = document.querySelector('#teksti');
const kieliYksi = document.querySelector('#Kielivaihtoehto1');
const kieliKaksi = document.querySelector('#Kielivaihtoehto2');
const logo = document.querySelector('#logo');
const sofi = document.querySelector('#sofi');
const miro = document.querySelector('#miro');
const Info_Screen = document.querySelector('#info-screen');
const playerCustomize = document.querySelector('#player-customize');
let backgroundImage = new Image();
document.body.appendChild(canvas);

//--------------------------------------Scenet
const scenes = {
  menu: () => {
    backgroundImage.src = 'images/Scenes/starter.png';
    questBox.style.display = 'none';
    chooseButtons.style.display = 'none';
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  },
  scene_1: () => {
    backgroundImage.src = 'images/Scenes/starter.png';
    chooseButtons.style.display = 'block';
    questBox.style.display = 'block';
    logo.style.display = 'none';
    startButton.style.display = 'none';
    kieliYksi.style.display = 'none';
    kieliKaksi.style.display = 'none';
    miro.style.display = 'none';
    sofi.style.display = 'none';
  },
  scene_2: () => {
    backgroundImage.src = 'images/Scenes/Info_Screen.png';
  },
  scene_3: () => {
    backgroundImage.src = 'images/Scenes/Player Character customization.png';
  },
  scene_4: () => {
    backgroundImage.src = 'images/Scenes/Scene ALT UI.png';
  },
  scene_5: () => {
    backgroundImage.src = 'images/Scenes/Scene 1.1.png';
  },
  scene_6: () => {
    backgroundImage.src = 'images/Scenes/Scene 1.1.sofii.png';
  },
  scene_7: () => {
    backgroundImage.src = 'images/Scenes/Scene 1.1 Option 1.png';
  },
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

chooseButtons.addEventListener('click', function () {
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
    case 'scene_2':
      return 'scene_3';
    case 'scene_3':
      return 'scene_4';
    case 'scene_4':
      return 'scene_5';
    case 'scene_5':
      return 'return_6';
    case 'scene_6':
      return 'scene_7';
    case 'scene_7':
      return 'scene_8';
    case 'scene_8':
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
      updateUI(); // Päivitä tekstit uuteen tilaan
    }
  });
//-------------------------------------------------------------------------------
