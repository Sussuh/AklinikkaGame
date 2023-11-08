import StartSceneData from '/Data/StartSceneData.js';
import Suomi from './Data/suomi.js';

const textField = document.querySelector('#teksti');

let currentBackground;
let language = Suomi;
let currentScene;

ChangeScene(StartSceneData.SofillaOnTietoa_1);

function ChangeScene(scene) {
  currentScene = scene;
  SceneChange();
  // document.getElementById('narrator').textContent = scene.narrator;
  // const optionButtons = document.getElementsByClassName('option-button');
  // for (let i = 0; i < scene.options.length; i++) {
  //   optionButtons[i].textContent = scene.options[i].text;
  // }
}

function SceneChange() {
  if (currentScene.type == 'linear') {
    // event listener here?
    //.addEventListener('click', function () {
    //ChangeScene(currentScene.next_scene);} ???
    // document
    //   .getElementById('option-button-1')
    //   .addEventListener('click', function () {
    //     selectOption(0);
    //   });
    // document
    //   .getElementById('') //Nimeä
    //   .addEventListener('click', function () {
    //     selectOption(1);
    //   });
  }
  if (currentScene.background != currentBackground) {
    currentBackground = currentScene.background;
    // change background here
  }
  if (currentScene.characters != null) {
    for (let i = 0; i < currentScene.characters.length; i++) {
      // draw characters here
    }
  }
  let textId = currentScene.text;
  textField.innerHTML = language[textId];
}

// Vaihtoehdot teksti päivittymään, klikatessa vaihtuu, Consoleen tieto
// mikä scene....
