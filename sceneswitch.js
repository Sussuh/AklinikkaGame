document.addEventListener("DOMContentLoaded", function () {
  var scene1Button = document.getElementById("scene1Button");
  var scene2Button = document.getElementById("scene2Button");
  var scene3Button = document.getElementById("scene3Button");
  var scene4Button = document.getElementById("scene4Button");

  scene1Button.addEventListener("click", function () {
    changeScene(2);
  });

  scene2Button.addEventListener("click", function () {
    changeScene(3);
  });

  scene3Button.addEventListener("click", function () {
    changeScene(4);
  });

  scene4Button.addEventListener("click", function () {
    changeScene(1);
  });
});

function changeScene(sceneNumber) {
  var scenes = document.querySelectorAll(".scene");
  scenes.forEach(function (scene) {
    scene.classList.remove("visible");
  });

  var selectedScene = document.getElementById("scene" + sceneNumber);
  selectedScene.classList.add("visible");
}
