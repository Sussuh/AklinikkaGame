import StartSceneData from "/Data/StartSceneData.js";
import Suomi from "./data/suomi.js";

const infoboxElement = document.querySelector('.infobox');
const speechBubbleElement = document.querySelector('.speech-bubble');
const mainGameContainer = document.querySelector('.game-flex-container');
const settingsMenu = document.querySelector('.top-options-menu');

// array queries
const characterElements = document.querySelectorAll('.character');
const playerChoiceElements = document.querySelectorAll('.player-choice-button');
const playerChoiceTextElements = document.querySelectorAll('.player-choice-text');

let currentBackground;
let language = Suomi;
let currentScene;
let nextScene;

currentScene = StartSceneData.SofillaOnTietoa_1;
addClickEventListener();

function addClickEventListener(){
  mainGameContainer.addEventListener("click", event => {
    
    // double click speed timer here to avoid accidental progress?

    if (event.target.matches(settingsMenu)){
      //TODO settings menu opening?
      return;
    }

    if (currentScene.type === "linear"){
      console.log("linear scene clicked");
      nextScene = StartSceneData[currentScene.next_scene];
      PopulateScene();
      return;
    }
    // if choice elements clicked, set nextscene
    for (let i = 0; i< playerChoiceElements.length; i++){
      if(event.target.matches(playerChoiceElements[i])){
        nextScene = StartSceneData[currentScene.player_choice[i].next_scene];
        console.log("player option selected" + playerChoiceElements[i]);
        PopulateScene();
        return;
      }
    }
  });
}

function PopulateScene(){
  console.log(currentScene);
  console.log(nextScene);
}