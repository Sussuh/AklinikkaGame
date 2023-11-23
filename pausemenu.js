// importable javascript file that opens menu when function is called
//Menu
const settingsMenu = document.querySelector('.pauseMenuBox');
const gameButtons = document.querySelector("game-buttons");

const continueButton = document.querySelector("pause-button");
const restartButton = document.querySelector("restart-button");

export function SetupPauseMenu() {
    // validates pausemenu.js

    continueButton.addEventListener("click", ContinueGame);
    restartButton.addEventListener("click", RestartGame);
}

export function OpenPauseMenu() {

    console.log("Pause menu opened");
}
function ContinueGame() {
    console.log("continue game");
}
function RestartGame() {
    console.log("restart game");
}
function ClosePauseMenu() {
    console.log("close pause menu");
}