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
