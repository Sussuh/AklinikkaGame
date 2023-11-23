// Sample scene data in JSON format
const sceneData = [
    {
        id: 1,
        background: "background1.jpg",
        character: "character1.png",
        dialogue: "Welcome to Scene 1! Choose your path:",
        options: [
            { text: "Option A", nextScene: 2 },
            { text: "Option B", nextScene: 3 },
        ],
    },
    {
        id: 2,
        background: "background2.jpg",
        character: "character2.png",
        dialogue: "You chose Option A in Scene 1.",
        options: [
            { text: "Continue", nextScene: 1 },
        ],
    },
    {
        id: 3,
        background: "background3.jpg",
        character: "character3.png",
        dialogue: "You chose Option B in Scene 1.",
        options: [
            { text: "Continue", nextScene: 1 },
        ],
    },
];

let currentScene = 1;

function updateScene(sceneId) {
    const scene = sceneData.find((scene) => scene.id === sceneId);
    if (scene) {
        document.getElementById("background").src = scene.background;
        document.getElementById("character").src = scene.character;
        document.getElementById("dialog").textContent = scene.dialogue;

        const optionsContainer = document.getElementById("options-container");
        optionsContainer.innerHTML = "";

        scene.options.forEach((option) => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.addEventListener("click", () => {
                currentScene = option.nextScene;
                updateScene(currentScene);
            });
            optionsContainer.appendChild(button);
        });
    }
}

updateScene(currentScene);