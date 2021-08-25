const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var stones = [];


function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  backgroundImage = loadImage("./assets/background.png");
  zombieSad = loadImage("./assets/sad_zombie.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  rightwall = new Base(width/2+600,height-300,200,150);
  leftwall = new Base(width/2-620,height-200,200,150);
  joinPoint = new Base(width-130,height/2- 100,40,20);
  bridge = new Bridge(27,{x:leftwall.body.position.x-20,y:height/2-100});
  ground = new Base(width/2,height-10,width*2,20);

  Matter.Composite.add(bridge.body,joinPoint);  
  joinLink = new Link (bridge,joinPoint);

for(var i = 0;i <= 8;i++){
  var x = random(width/2-200,width/2+300);
  var y = random(-200,40);
  var stone = new Stone(x,y,50,50);
  stones.push(stone);
}
zombie = createSprite(width/2,height-100);
zombie.addAnimation("left",zombie1,zombie2,zombie1);
zombie.addAnimation("right",zombie3,zombie4,zombie3);
zombie.addImage("sad",zombieSad);
zombie.scale = 0.1;
zombie.velocityX = 10;


breakButton = createImg("./assets/axe.png");
breakButton.position(width-200,height/2 - 50);
breakButton.size(70,70);
breakButton.mouseClicked(handleButtonPress);

}

function draw() {
  background(51);
  Engine.update(engine);
  image(backgroundImage,0,0,windowWidth,windowHeight);

bridge.show();

for(stone of stones){
  stone.display();
  var pos = stone.body.position;
  var d = dist(zombie.position.x,zombie.position.y,pos.x,pos.y);
  if(d<=20){
    zombie.velocityX = 0;
    Matter.Body.setVelocity(stone.body,{x:10,y:-10});
    zombie.changeImage("sad");
    collided = true;
}
}
if(zombie.position.x >=width - 300){
  zombie.velocityX = -10;
  zombie.changeAnimation("right");

}
if(zombie.position.x <= 300){
  zombie.velocityX = 10;
  zombie.changeAnimation("left");




}

drawSprites();
}
function handleButtonPress(){
  joinLink.dettach();
  setTimeout(()=>{
    bridge.break();
  },1500 )
}

