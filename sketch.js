var PLAY=1
var END=0
var gamestate=PLAY
var trex ,trex_running;
var score=0
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  trex_morto = loadAnimation('trex_collided.png')

  chao=loadImage('ground2.png')

  nuvens=loadImage('cloud.png')

  obstaculo=loadImage('obstacle1.png')
  obstaculo2=loadImage('obstacle2.png')
  obstaculo3=loadImage('obstacle3.png')
  obstaculo4=loadImage('obstacle4.png')
  obstaculo5=loadImage('obstacle5.png')
  obstaculo6=loadImage('obstacle6.png')

  teladegameover=loadImage('gameOver.png')

  teladerestart=loadImage('restart.png')

  somdemorte=loadSound('die.mp3')
  somdepulo=loadSound('jump.mp3')
  somdepoint=loadSound('checkpoint.mp3')
 


}

function setup(){
  createCanvas(windowWidth,windowHeight)

  grupo1=new Group()
  grupo2=new Group()
  //crie um sprite de trex
  trex = createSprite(50,150,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation('trex_morto', trex_morto);
  trex.scale=0.9

  //crie  um srite de fundo
  choa=createSprite(width*0.5,height*0.93)
  choa.addImage('chao',chao)
  invisivel=createSprite(width*0.5,height*0.93,width,1)

  invisivel.visible=false


  trex.setCollider('circle',0,20,25)
  trex.debug=false

  gameover=createSprite(width/2,height/3)
  gameover.addImage('teladegameover', teladegameover);

  restart=createSprite(width/2,height/2)
  restart.addImage('teladerestart', teladerestart); 
  restart.scale = 0.1







  
  


}

function draw(){
  background("white")
  drawSprites();
  
  //gravidade
  trex.velocityY=+5
  trex.collide(invisivel)
    
  if(gamestate===PLAY){

    if(choa.x<0){
      choa.x=width*0.5
  
  }
 

  if(touches.length>0&&trex.y>=height*0.7){
    trex.velocityY=-10

    somdepulo.play()

  }
  
  console.log(trex.y)
  gerarnuvens()
  gerarobstaculos()
  choa.velocityX=-10

  score+=Math.round(frameCount/150)
  text('score :'+score,25,25)

  gameover.visible=false
  restart.visible=false

  if(score>0&&score%1000==0){

    somdepoint.play()

  
  }



  if(grupo2.isTouching(trex)){


    grupo2.setLifetimeEach(-1)

    grupo1.setLifetimeEach(-1)

    somdemorte.play()

    gamestate=END

  }


  }
  else if(gamestate===END){

    choa.velocityX=0
    grupo1.setVelocityXEach(0)
    grupo2.setVelocityXEach(0)
    trex.changeAnimation('trex_morto', trex_morto)

    gameover.visible=true
    
    restart.visible=true

    if(mousePressedOver(restart)){
      gamestate=PLAY
      score=0
      choa.velocityX=10
      trex.changeAnimation('running', trex_running)
      grupo1.destroyEach()
      grupo2.destroyEach()
    
    }
    
    
  }





}



function gerarnuvens(){
  altura=Math.round(random(10,50))
  if(frameCount%50==0){
    nuvem = createSprite(width,height*0.01*altura,100,20)
    nuvem.addImage('nuvens',nuvens)
    nuvem.velocityX=-10
    nuvem.depth=trex.depth-1
    nuvem.lifetime=width/nuvem.velocityX
    grupo1.add(nuvem)
  } 
  }
function gerarobstaculos(){

  if(frameCount%50==0){
    obstacle=createSprite(width,height*0.9)
    obstacle.velocityX=-10
    if(score>0&&score%1000==0){
      obstacle.velocityX-=3
    }
    obstacle.scale=0.7
    obstacle.lifetime=width/obstacle.velocityX
    grupo2.add(obstacle)
    var randen=Math.round(random(1,6))
    switch(randen){
      case 1:obstacle.addImage('obstacle',obstaculo)

      break
      case 2:obstacle.addImage('obstacle',obstaculo2)

      break
      case 3:obstacle.addImage('obstacle',obstaculo3)

      break
      case 4:obstacle.addImage('obstacle',obstaculo4)

      break
      case 5:obstacle.addImage('obstacle',obstaculo5)

      break
      case 6:obstacle.addImage('obstacle',obstaculo6)

      break
      default:break

    }

  }
  
}