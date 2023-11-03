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
const infoBox = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeInfoBox = document.querySelector('.close-modal');
const openInfoBox = document.querySelectorAll('.show-modal');
let backgroundImage = new Image();
document.body.appendChild(canvas);

//------------------------------LisätietoBoxit, työnalla
console.log(openInfoBox);

for (let i = 0; i < openInfoBox.length; i++) {
  console.log(
    openInfoBox[i].addEventListener('click', function () {
      console.log('Button Clicked.. Boxi avautuu');
      infoBox.classList.remove('hidden');
      overlay.classList.remove('hidden');
    })
  );
}

closeInfoBox.addEventListener('click', function () {
  infoBox.classList.add('hidden');
  overlay.classList.add('hidden');
});

//--------------------------------------Scenet
const scenes = {
  menu: () => {
    backgroundImage.src = 'images/Scenes/starter.png';
    questBox.style.display = 'none'; //None = Ei näy ja Block = Näkyy
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
  }, // Nuoli funktio () => { Sisältö }, <-- muista pilkku loppuun.
  scene_3: () => {
    backgroundImage.src = 'images/Scenes/starter.png';
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
  //Muista päivittää GetNextScene Switchi
  switch (currentSceneName) {
    case 'menu':
      return 'scene_1';
    case 'scene_1':
      return 'scene_2';
    case 'scene_2':
      return 'scene_3';
    case 'scene_3':
      return 'scene_4';
    default:
      return currentScene;
  }
}

function piirrä() {
  scenes[currentScene]();
}

piirrä();
//---------------------------------------------------------------------------------

// ----------------------TARINAN KULKU---------------------------------------------

//-------- Päivitä Json tiedoston haku
//----- Tutustu parse ja Fetch eroihin? Tallentuuko muisteihin jotain, onko raskas.
//------- https://github.com/Massimosch/AklinikkaGame/blob/RikuTestground/Data/json_format_example.json
//-------- https://github.com/Massimosch/AklinikkaGame/blob/RikuTestground/Data/suomi.json
//----------------------------------------------------------------------------------
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
      // document.querySelector('#background').src =
      //   currentState['scene_background'];
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
