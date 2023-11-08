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

let currentBackground;
let language = Suomi;
let currentScene;

ChangeScene(StartSceneData.SofillaOnTietoa_1);

function ChangeScene(scene) {
  currentScene = scene;
  SceneChange();
}

function SceneChange() {
  if (currentScene.type == "linear") {
    // event listener here?
    //.addEventListener('click', function () {
    //ChangeScene(currentScene.next_scene);} ???
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