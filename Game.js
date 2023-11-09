/*
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

let currentBackground;
let language = Suomi;
let currentScene;

ChangeScene(StartSceneData.SofillaOnTietoa_1);

function ChangeScene(scene) {
  currentScene = scene;
  console.log(scene);
  SceneChange();
}

function SceneChange() {
  if (currentScene.type == "linear") {
    mainGameContainer.addEventListener('click', () => ChangeScene(currentScene.next_scene));
    // event listener here?
    //.addEventListener('click', function () {
    //ChangeScene(currentScene.next_scene);} ???
  }
  else if (currentScene.type == "options"){
    console.log("test");
    for (let i = 0; i< currentScene.player_choice.length; i++) {
      let playerChoiceBox = document.createElement('playerChoiceButton_' + [i]);
      bottomContainer.appendChild(playerChoiceBox);
      playerChoiceBox.className = 'choice-button';

      const text = document.createTextNode(language[currentScene.player_choice[i].text]);
      playerChoiceBox.appendChild(text);
      playerChoiceBox.addEventListener('click', () => ChangeScene(currentScene.player_choice[i].next_scene));
    }
  }
  if (currentScene.background != currentBackground){
    currentBackground = currentScene.background;
    // change background here
  }
  if (currentScene.characters != null){
    for (let i = 0; i < currentScene.characters.length; i++) {
      // draw characters here
    }
  }
  let textId = currentScene.text;
  textField.innerHTML = language[textId];
}