var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var car1, car2, car3, car4, cars, track;
var car1IMG, car2IMG, car3IMG, car4IMG;

function preload(){
  car1IMG = loadImage("car1.png");
  car2IMG = loadImage("car2.png");
  car3IMG = loadImage("car3.png");
  car4IMG = loadImage("car4.png");
  track = loadImage("track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight -30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
    game.rank();
  }
}