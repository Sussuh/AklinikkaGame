'use strict';
import StartSceneData from '/Data/StartSceneData.js';
import Suomi from './data/suomi.js';
const textField = document.querySelector('.infobox');
const speechBubble = document.querySelector('.SpeechBubble');
const choiceBox = document.querySelector('.ChoiceBox');
//const menuContainer = document.querySelector('.menu-container')

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
  }
  if (currentScene.background != currentBackground) {
    currentBackground = currentScene.background;
    // change background here
    updateBackground(currentBackground); // Checkkaa console.. en oikein ymmärrä miksei piirrä
  }
  if (currentScene.characters != null) {
    for (let i = 0; i < currentScene.characters.length; i++) {
      // draw characters here
      drawCharacters(null); // ????????????????
    }
  }
  let textId = currentScene.text;
  textField.innerHTML = language[textId];
}
//TODO:
// Vaihtoehdot teksti päivittymään, klikatessa vaihtuu, Consoleen tieto
// mikä scene....

function updateBackground(backgroundImageSrc) {
  const backgroundImageElement = document.getElementById('backgroundImage');
  if (backgroundImageElement) {
    backgroundImageElement.src = `/image/backgrounds/${backgroundImageSrc}`;
  }
}

function drawCharacters(characterImageSrc) {
  const characterImageElement = document.querySelector('.character');
  if (characterImageElement) {
    characterImageElement.src = `/image/characters/${characterImageSrc}`;
  }
}
