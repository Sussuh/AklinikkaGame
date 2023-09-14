// NOTE: We don't need to import Button class, since it's already included in the drawButton
import { drawButton, Button } from "/js/classes/button.js";
import { infotext } from "/js/modules/info.js";
import { backgrounds } from "/js/modules/backgrounds.js";
// Define variables

// Get the canvas element and its 2D rendering context
let canvas = document.getElementById("gameCanvasMobile"); // Set initial value to canvasMobile
let ctx = canvas.getContext("2d");
const canvasMobile = document.getElementById("gameCanvasMobile");
const ctxMobile = canvasMobile.getContext("2d");
const canvasDesktop = document.getElementById("gameCanvasDesktop");
let outerCanvasSizeWidth;
let outerCanvasSizeHeight;

window.addEventListener("load", () => {
  outerCanvasSizeWidth =
    document.getElementById("gameCanvasWrapper").offsetWidth;
  outerCanvasSizeHeight =
    document.getElementById("gameCanvasWrapper").offsetHeight;
});

window.addEventListener("resize", () => {
  outerCanvasSizeWidth =
    document.getElementById("gameCanvasWrapper").offsetWidth;
  outerCanvasSizeHeight =
    document.getElementById("gameCanvasWrapper").offsetHeight;
});

const canvasVisibilityChangeEvent = new Event("canvasVisibilityChange");
// NOTE: Get the canvas elements and their 2D rendering contexts only once

function checkCanvasVisibility() {
  if (canvasMobile.style.display === "block") {
    //NOTE: Can also add a class with certain properties (display: block).
    console.log("Mobile is visible");
    // canvasMobile.dispatchEvent(canvasVisibilityChangeEvent); // INFO: .dispatchEvent is handy sometimes
  } else if (canvasDesktop.style.display === "block") {
    console.log("Desktop is visible");
    // canvasDesktop.dispatchEvent(canvasVisibilityChangeEvent);
  }
}
// const mobileCanvas = document.getElementById('gameCanvasMobile');
// const desktopCanvas = document.getElementById('gameCanvasDesktop');

function updateCanvasVisibility() {
  // Show mobile
  if (window.innerWidth <= 767) {
    canvasMobile.classList.add("visible");
    canvasDesktop.classList.remove("visible");
    canvasMobile.style.backgroundImage =
      "url(images/background/tokyo-streets.png)";
    canvasMobile.style.backgroundPosition = "center";
    //canvasMobile.style.backgroundColor = "#218000";
  } else {
    // Show desktop
    canvasMobile.classList.remove("visible");
    canvasDesktop.classList.add("visible");
    canvasDesktop.style.backgroundImage = "";
    canvasMobile.style.backgroundSize = "cover";
    canvasDesktop.style.backgroundColor = "#341000";
  }
  // Dispatch the event on the whole document, not on the individual canvases
  document.dispatchEvent(canvasVisibilityChangeEvent);
}

// Add only one event listener for the 'canvasVisibilityChange' event
document.addEventListener("canvasVisibilityChange", function () {
  if (canvasMobile.classList.contains("visible")) {
    canvas = canvasMobile;
    ctx = ctxMobile;
  } else {
    canvas = canvasDesktop;

    //ctx = ctxDesktop;
  }

  // NOTE: game canvas size
  canvas.width = outerCanvasSizeWidth * 0.95;
  canvas.height = outerCanvasSizeHeight * 0.95;
});
// Call the function when the page loads
window.addEventListener("load", updateCanvasVisibility);
// Call the function when the window is resized
window.addEventListener("resize", updateCanvasVisibility);

canvasMobile.addEventListener("canvasVisibilityChange", function () {
  console.log("mobile visibility changed");
  canvas = canvasDesktop;
  //ctx = ctxDesktop; Stop reading since we are not using desktop for now.
});
canvasDesktop.addEventListener("canvasVisibilityChange", function () {
  console.log("desktop visibility changed");
  canvas = canvasMobile;
  ctx = ctxMobile;
});

// Player sprite image
const player = new Image(); // Create new img element
player.src = "/images/sprites/smiley-icon.png";
let playerX = 0;
let playerY = 0;
let playerWidth = 0;
let playerHeight = 0;
let playerExtraWidth = 0;
let canIncrease = true;
const coordinatesInfo = document.querySelector(".coordinatesinfo p");

// Create game object images
function drawPlayerImage() {
  ctx.clearRect(playerX, playerY, playerWidth, canvas.width, canvas.height);
  playerWidth = 120 + playerExtraWidth;
  playerHeight = 120;

  //INFO: Show the player coordinates in the element below the game canvas
  coordinatesInfo.textContent = ` Smiley moves: x: ${Math.round(
    playerX
  )} y: ${Math.round(playerY)}`;

  // WARNING: Objects stack up on each other, thus the BG-image must be drawn first. Otherwise it will cover everything.
  // example:
  //ctx.drawImage(background-image);
  // ctx.drawImage(player-image);
  // ctx.drawImage(smoke-in-front);
  ctx.drawImage(player, playerX, playerY, playerWidth, playerHeight); //INFO: Parameters: Image to draw, x- and y-coordinates, width and height

  if (playerX > canvas.width - 100) {
    playerX = 0; // Return back
  }

  // Idle animation:

  if (playerWidth <= 170 && canIncrease) {
    playerExtraWidth++;
  }
  if (playerWidth >= 120 && !canIncrease) {
    playerExtraWidth--;
    if (playerWidth <= 120) {
      canIncrease = true;
    }
  }
  if (playerWidth >= 170) {
    canIncrease = false;
  }
}

let index = 1;
let canMove = false;
export function drawBackgroundImage() {
  canvasMobile.style.backgroundImage = backgrounds[index].path;
  //"url(images/background/tokyo-streets.png)";
  canvasMobile.style.backgroundPosition = "center";
  //ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (index == 2) {
    index = 0;
    canMove = false;
  } else {
    index++;
    canMove = true;
  }
}

// NOTE: Specific case to send and get this to work in index.html:
window.drawBackgroundImage = drawBackgroundImage; //<-- creates a global window variable

// UIbutton.addEventListener(
//   "load",
//   () => {

// alert(UIbutton);
//   },
//   false
// );
// const background = new Image();
// background.src = backgrounds[0].path;

function objectMoveLoop() {
  if (canMove) {
    playerY += 0.2;
    playerX += 0.3;
    playerWidth += 20;
  }
}

export function movePlayer() {
  playerX += 20;
}
window.movePlayer = movePlayer; // NOTE: this was needed as a hack to make it run in index.html.
//HTML expects the movePlayer to be on the global window object. The new JavaScript module system
//doesn't add anything to the global namespace, to avoid namespace pollution.

//-------------GAME LOOP -------------------//

function updateGame() {
  checkCanvasVisibility();
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayerImage();
  objectMoveLoop();
  requestAnimationFrame(updateGame);
  // Draw the UI button using the drawButton function

  // const firstbutton = drawButton(
  //   canvas,
  //   ctx,
  //   canvas.width * 0.08,
  //   canvas.height * 0.88,
  //   canvas.width * 0.4,
  //   canvas.height * 0.1,
  //  '',
  //   "Kyllä",
  //   ''
  // );

  // const secondbutton = drawButton(
  //   canvas,
  //     ctx,
  //     firstbutton.x + firstbutton.width * 1.1,
  //     firstbutton.y,
  //     firstbutton.width,
  //     firstbutton.height,
  //     'red',
  //     "Ei",
  //     ''
  //   );

  // Call the updateGame function again using requestAnimationFrame
}
//----------------------------------------//

requestAnimationFrame(updateGame);