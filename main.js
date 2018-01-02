// main.js

let game; // Main game program
let resources = {
    bgm: null,
    font: null,
    catImg: [],
    rbImg: [],
    starImg: [],
    coinImg: [],
    stoneImg: [],
    catIcon: null,
    coinIcon: null
};

function preload() {
    resources.bgm = loadSound("asset/bgm.mp3");
    resources.font = loadFont("asset/voltergoldfish.ttf");
    resources.catIcon = loadImage("asset/catIcon.png");
    resources.coinIcon = loadImage("asset/coinIcon.png");
    resources.rbImg[0] = loadImage("asset/RainbowImg.png");

    for (let i = 0; i < 12; i++) 
        resources.catImg[i] = loadImage("asset/catImg/catImg" + i + ".png");

    for (let i = 0; i < 6; i++) 
        resources.starImg[i] = loadImage("asset/starImg/star" + i + ".png");

    for (let i = 0; i < 8; i++) 
        resources.coinImg[i] = loadImage("asset/coinImg/Coin_" + i + ".png");

    for (let i = 0; i < 72; i++) 
        resources.stoneImg[i] = loadImage("asset/stoneImg/Stone_" + i + ".png");

}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    game = new Game();
}

function draw() {
    background(9, 37, 77);
    textFont(resources.font);
    fill(255);
    game.run();
}
