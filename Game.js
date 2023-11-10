/*
Random kysymyksiä: Tuleeko image latausaikoja backgroundeja vaihtamalla urlilla? 
Vaihetaanko linkit dataurleiksi? 
Error handling javascript web devauksessa? Onko järkeviä työtapoja? :weary:

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

const InfoboxElement = document.querySelector('.infobox');
const SpeechBubbleElement = document.querySelector('.speech-bubble');
const mainGameContainer = document.querySelector('.game-flex-container');

// array queries
const characterElements = document.querySelectorAll('.character');
const playerChoiceElements = document.querySelectorAll('.player-choice-button');
const playerChoiceTextElements = document.querySelectorAll('.player-choice-text');

let currentBackground;
let language = Suomi;
let currentScene;
let choiceBoxArray = [];

StartGame();
function StartGame(){
  // starting scene here
  currentScene = StartSceneData.LydianHuolet_1;

  SceneChange();
}

function StartSceneChange(scene) {
  if (scene == "TempDemoEnd") {
    console.log("Scene misstyped, doesnt exist or just null???");
    
  }
  
  ResetListenersAndElements();

  currentScene = StartSceneData[scene];
  console.log(currentScene);
  SceneChange();
}

// main scene change function
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
    //mainGameContainer.body.style.backgroundImage = "url(images/backgrounds/" + currentBackground + ")";
  }

  // draw characters here
  // character string arrayna, iteroi läpi vertaa currenttiin ja replacee backgroundin jos eri?
  for (let i = 0; i< characterElements.length; i++){
    if (i >= currentScene.characters.length){
      characterElements[i].classList.add('hidden');
      continue;
    }
    characterElements[i].style.backgroundImage = "url(images/characters/" + currentScene.characters[i] + ".png)";
    characterElements[i].classList.remove('hidden');
  }
  if (currentScene.text_type == "dialogue"){
    WriteDialogue();
  }
  if (currentScene.text_type == "infobox"){
    WriteInfobox();
  }
}

function WriteInfobox(){

}

function WriteDialogue(){
  SpeechBubbleElement.classList.remove('hidden');
  SpeechBubbleElement.textContent = language[currentScene.text];
}

function LinearSceneSetup(){
  // Click anything, even children of maincontainer triggers scene change
  mainGameContainer.addEventListener('click', () => StartSceneChange(currentScene.next_scene));
}

// iterate through 4 readymade choice boxes and populate if not null
function PlayerChoiceSetup(){
  for (let i = 0; i< playerChoiceElements.length; i++) {
    // hide null choices
    if (i >= currentScene.player_choice.length){
      playerChoiceElements[i].classList.add('hidden');
      continue;
    }
    playerChoiceElements[i].classList.remove('hidden');
    playerChoiceTextElements[i].textContent = language[currentScene.player_choice[i].text];

    playerChoiceElements[i].addEventListener('click', () => StartSceneChange(currentScene.player_choice[i].next_scene));
  }
}

// reset before current scene is changed to target event listeners
function ResetListenersAndElements(){
  if (currentScene.type == "linear") {
  mainGameContainer.removeEventListener('click', StartSceneChange);
  }

  else if (currentScene.type == "options"){
    for (let i = 0; i< playerChoiceElements.length; i++) {
      if (i >= currentScene.player_choice.length){
        playerChoiceElements[i].classList.add('hidden');
        continue;
      }
      playerChoiceElements[i].removeEventListener('click', StartSceneChange);
      playerChoiceElements[i].classList.add('hidden');
    }
  }
  else {
    console.log(currentScene + "type : misstype? options or linear only");
  }
}