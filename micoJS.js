'use strict';

import StartSceneData from '/Data/StartSceneData.js';
import Suomi from './data/suomi.js';

const infoboxElement = document.querySelector('.infobox');
const speechBubbleElement = document.querySelector('.speech-bubble');
const mainGameContainer = document.querySelector('.game-flex-container');
const settingsMenu = document.querySelector('.top-options-menu');

// array queries
const characterElements = document.querySelectorAll('.character');
const playerChoiceElements = document.querySelectorAll('.choiceBox');
const playerChoiceTextElements = document.querySelectorAll(
  '.player-choice-text'
);

let currentBackground;
let language = Suomi;
let currentScene;
let nextScene;

currentScene = StartSceneData.SofillaOnTietoa_2;
addClickEventListener();

function addClickEventListener() {
  mainGameContainer.addEventListener('click', event => {
    // double click speed timer here to avoid accidental progress?

    if (event.target === settingsMenu) {
      //TODO settings menu opening?
      return;
    }

    if (currentScene.type === 'linear') {
      console.log('linear scene clicked');
      nextScene = StartSceneData[currentScene.next_scene];
      PopulateScene();
      return;
    }
    // if choice elements clicked, set nextscene
    for (let i = 0; i < playerChoiceElements.length; i++) {
      if (event.target.parentElement === playerChoiceElements[i]) {
        nextScene = StartSceneData[currentScene.player_choice[i].next_scene];
        console.log('player option selected' + playerChoiceElements[i]);
        PopulateScene();
        return;
      }
    }
  });
}

function PopulateScene() {
  // background image change
  if (
    nextScene.background !== currentBackground &&
    nextScene.background !== null
  ) {
    currentBackground = nextScene.background;
    mainGameContainer.style.backgroundImage =
      'url(images/backgrounds/' + currentBackground + ')';
  }

  // draw characters here
  for (let i = 0; i < characterElements.length; i++) {
    if (i >= nextScene.characters.length) {
      characterElements[i].classList.add('hidden');
      continue;
    }
    characterElements[i].style.backgroundImage =
      'url(images/characters/' + nextScene.characters[i] + '.png)';
    characterElements[i].classList.remove('hidden');
  }

  if (nextScene.text_type == 'dialogue') {
    WriteDialogue();
  }
  if (nextScene.text_type == 'infobox') {
    WriteInfobox();
  }

  currentScene = nextScene;
}
function WriteInfobox() {
  infoboxElement.classList.remove('hidden');
  infoboxElement.textContent = language[nextScene.text];
  SpeechBubbleElement.classList.add('hidden');
}
function WriteDialogue() {
  SpeechBubbleElement.classList.remove('hidden');
  SpeechBubbleElement.textContent = language[nextScene.text];
  infoboxElement.classList.add('hidden');
}
/*
import StartSceneData from '/Data/StartSceneData.js';
import Suomi from './data/suomi.js';
const textField = document.querySelector('.infobox');
const speechBubble = document.querySelector('.SpeechBubble');
const choiceBox = document.querySelector('.bottom-choice-container');
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
    updateBackground(currentBackground);

    if (currentScene.characters != null) {
      for (let i = 0; i < currentScene.characters.length; i++) {
        drawCharacters(null); // draw characters here??
      }
    }
    let textId = currentScene.text;
    textField.innerHTML = language[textId];
  }

  console.log(currentBackground);

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

  function createButton(text, clickCallback) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickCallback);
    choiceBox.appendChild(button);
  }

  createButton(`t_sofi_outside_option_1`, () => {
    ChangeScene(StartSceneData.SofillaOnTietoaRoskiksille);
  });

  createButton(`t_sofi_outside_option_2`, () => {
    ChangeScene(StartSceneData.SofillaOnTietoaRoskiksille);
  });
}

///*/
