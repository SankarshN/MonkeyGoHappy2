var monkeyWalk, monkey, backgroundImg, ground, bananaImg;
var obstacleImg, obstacleGroup, score;
var invisGround, foodGroup;
var score;
function preload() {
  backgroundImg = loadImage("jungle.jpg");
  monkeyWalk = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  invisGround = createSprite(200,360,400,10);
  invisGround.visible = false;
  
  monkey = createSprite(50,340,10,10);
  monkey.addAnimation("monkey",monkeyWalk);
  monkey.scale = 0.1;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 8;
}

function draw() {
  background(backgroundImg);
  food();
  obstacles();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score = "+score,300,70);
  
  if(keyDown("space") && monkey.y>300){
    monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisGround);
  
  if(foodGroup.isTouching(monkey)){
    score = score+1;
    foodGroup.destroyEach();
  }

  
  if(obstacleGroup.isTouching(monkey)){
    score = 0;
    monkey.scale = 0.1;
  }
  
  switch(score){
    case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: player.scale=0.18;
      break;
      default: break;
  }
  
  drawSprites();
}

function food(){

  if(frameCount%80 === 0){
    var banana = createSprite(400,200,10,10);
    banana.addAnimation("banana", bananaImg); 
    banana.scale = 0.05;
    banana.y = Math.round(random(150,200));
    banana.velocityX = -5;
    foodGroup.add(banana);
    banana.lifetime = 100;
  }
}

function obstacles(){
  if (frameCount%300 ===0){
    var obstacle = createSprite(400,355,10,10);
    obstacle.addAnimation("stone", obstacleImg);
    obstacle.scale = 0.15;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);
  }
}