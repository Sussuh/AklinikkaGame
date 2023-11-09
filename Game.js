/*
Random kysymyksiä: Tuleeko image latausaikoja backgroundeja vaihtamalla urlilla? 
Vaihetaanko linkit dataurleiksi? 

jos background ei liiku tai muutu usein. Pidetään se canvaksen ulkopuolella. Tai 2 canvasta: hahmot ja background. 

checkaa scenen type:
  "linear": mihin tahansa clickaamalla menee seuraavaan sceneen
  "options": tulee dialogi/infobox, jonka jälkeen pienellä delaylla(click nopeuttaa?) 
    tulee pelaajan vaihtoehdot event listenereillä. 
checkaa background: 
  jos let bg != scene.background { vaihda background}
checkaa character arrayn:
  Parasta varmaan vaan piirtää uudestaan hahmot, joka kerta, niin ei tarvi checkailla mitään ja ilmeet vaihtuu helposti. 
  canvakseen piirretään hahmot tai jotenkin muuten isketään ne screenille. foreach character in scene.characters?
  Positiot ja animaatiot voidaan miettiä joskus?
checkaa text_type:
  infobox tyylinen vai puhekupla.
  Pitäskö yhdistää text_type ja position? Luo yhden classin muotoilun mukaisen puhe boxin, jota saa säätää css puolella?
Lisää text boxiin: 
  valitusta language jsonista etsitään text kohdassa olleella id:llä. Oletus suomi
Jos linear type, next_scene ohjaa seuraavaan sceneen clickistä. 
Jos options scene:
  Delayn jälkeen foreach buttontext in player_options lisää nappula niiden event listenereillä
*/

import StartSceneData from "/Data/StartSceneData.js";
import Suomi from "./data/suomi.js";

const textField = document.querySelector('.infobox');
const bottomContainer = document.querySelector('.bottom-choice-container');
const mainGameContainer = document.querySelector('.game-flex-container');

// array queries
const characterElements = document.querySelectorAll('.character');
const playerChoiceElements = document.querySelectorAll('.player-choice-button');

let currentBackground;
let language = Suomi;
let currentScene;
let choiceBoxArray = [];

StartGame();
function StartGame(){
  // starting scene here
  currentScene = StartSceneData.SofillaOnTietoa_1;
  for (let i = 0; i < playerChoiceElements.length; i++) {
    playerChoiceElements[i].classList.add('hidden');
  }
  SceneChange();
}

function StartSceneChange(scene) {
  if (scene == null) {
    console.log(scene);
    console.log("Scene misstyped, doesnt exist or just null?");
    return;
  }
  console.log(StartSceneData[scene]);
  ResetListenersAndElements();

  currentScene = StartSceneData[scene];
  SceneChange();
}

function SceneChange() {
  // check scene type
  if (currentScene.type == "linear") {
    LinearSceneSetup();
  }
  else if (currentScene.type == "options"){
    PlayerChoiceSetup();
  }

  // check background
  if (currentScene.background != currentBackground || currentScene.background != null){
    currentBackground = currentScene.background;
    mainGameContainer.body.style.backgroundImage = "url(images/backgrounds/" + currentBackground + ")";
  }

  // draw characters here
  // character string arrayna, iteroi läpi vertaa currenttiin ja replacee backgroundin jos eri?
  for (let i = 0; i< currentScene.characters.length; i++){


  }
}

function LinearSceneSetup(){
  // Click anything, even children of maincontainer triggers scene change
  mainGameContainer.addEventListener('click', () => StartSceneChange(currentScene.next_scene));
}
function PlayerChoiceSetup(){
  for (let i = 0; i< currentScene.player_choice.length; i++) {
    let playerChoiceBox = document.createElement('playerChoiceButton_' + [i]);
    bottomContainer.appendChild(playerChoiceBox);
    playerChoiceBox.className = 'choice-button';

    const text = document.createTextNode(language[currentScene.player_choice[i].text]);
    playerChoiceBox.appendChild(text);
    choiceBoxArray.push(playerChoiceBox);
    playerChoiceBox.addEventListener('click', () => StartSceneChange(currentScene.player_choice[i].next_scene));
  }
}

// reset before current scene is changed to target event listeners
function ResetListenersAndElements(){
  if (currentScene.type == "linear") {
  mainGameContainer.removeEventListener('click', StartSceneChange);
  }

  else if (currentScene.type == "options"){
    for (let i = 0; i< choiceBoxArray.length; i++) {
      choiceBoxArray[i].removeEventListener('click', StartSceneChange);
      choiceBoxArray.remove();
    }
    // reset choiceBoxArray
    choiceBoxArray = [];
  }
}