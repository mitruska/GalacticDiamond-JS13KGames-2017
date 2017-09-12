alert('Kurwa no dziala');
// import "./components.js"

var camera = document.getElementById('gameCamera');
var gameScene = document.getElementById('scene2');
var portal = document.getElementById('portal');
var bigDiamond = document.createElement('a-octahedron');

var palette = ["rgb(238, 244, 66)","rgb(24, 89, 58)","rgb(89, 24, 46)"];

var points = [];
var platforms = [];
var score = 0;
var pointsCount = 0;
var level = 1;
var lim = 0; //time limit

var isStarted = false;
var isWon = false;
var endPositionZ = 0;

var displayScore = document.getElementById('score');

//camera.setAttribute('animation', anim);

var createSteps = (count) => {
  var platformCount = count;
  var radious = 100;

  var initX = 0.711; 
  var initY = 41.557;
  var initZ = -67.131;

  var deltaX = 0;
  var deltaY = 0;
  var deltaZ = 0;

  for(var i = 0; i<platformCount; i++){
    var point;
    var platform = document.createElement('a-sphere');

    platforms.push(platform);

    var newX = radious*Math.cos(deltaX);
    var newY = radious*Math.sin(deltaX);
    var newZ = initZ + deltaZ;

    var newColor = palette[i%3];
    
    platform.setAttribute('id', 'platform' + i);
    platform.setAttribute('position',{x:newX, y:newY, z:newZ});
    platform.setAttribute('scale',{x: 23.122, y: 4.125, z: 14.093});
    platform.setAttribute('scale-on-mouseenter', 'to:30 5 20');
    platform.setAttribute('scale-on-mouseleave', 'to:23.122, 4.125, 14.093');
    platform.setAttribute('material','color', newColor);
    platform.setAttribute('material', 'metalness', '0.5');

    gameScene.appendChild(platform); 
            
    if(i%10==0 || i%15==0){
      pointsCount++;
      point = document.createElement('a-octahedron');
      console.log(points);
      points.push(point);

      point.setAttribute('id', 'platform' + i);
      point.setAttribute('position',{x:newX-5, y:newY+10, z:newZ});
      point.setAttribute('scale',{x: 2, y: 5, z: 2});
      point.setAttribute('material','color', '#38e4be');
      point.setAttribute('scale-on-mouseenter', 'to:3 6 3');
      point.setAttribute('scale-on-mouseleave', 'to:2, 5, 2');
      point.setAttribute('cursor-listener', '');
      point.setAttribute('rotate', '');

      point.addEventListener('click', function(evt) {
        if(isStarted){
          score++;
          displayScore.setAttribute('text','value', 'Level: ' + level + '  score: ' + score + ' / ' + pointsCount);  
          gameScene.removeChild(this);
          points.splice(points.indexOf(this),1);
          console.log(score);
          if(score == pointsCount){
            bigDiamond.setAttribute('material','color', palette[0]);            
          }
        }     
      })

      gameScene.appendChild(point);
    }

    platform.addEventListener('click', function(evt) {

      if(isStarted) {
        var platformPos = this.getAttribute('position');
        //var anim = document.createElement('a-animation');

        // anim.setAttribute('attribute', 'position');
        // anim.setAttribute('from', camera.getAttribute('position'));
        //anim.setAttribute('to', ball.getAttribute('position'));
        // anim.setAttribute('dur', 1000);
        // anim.setAttribute('repeat', 1);
        // anim.setAttribute('to', {x:platformPos.x, y:platformPos.y + 15, z:platformPos.z });          
        //camera.appendChild(anim);
        console.log("platform");
        console.log(platformPos);
        camera.setAttribute('position', {x:platformPos.x, y:platformPos.y + 15, z:platformPos.z });  
      }     
    })

    deltaX+=20;
   // deltaY+=30;
    deltaZ+=-10;

    if(i==(platformCount-1)){
      endPositionZ = newZ;
      console.log("set portal position");
      console.log(i);
      console.log(endPositionZ);

    }

    console.log("making steps");
  }
}


var setPortalPosition = () => {
    portal.setAttribute('position', {x: 0, y: 0, z: endPositionZ - 100 } );
    portal.setAttribute('scale', {x: 50, y: 50, z: 20});
    
    bigDiamond.setAttribute('position', {x: 0, y: 0, z: endPositionZ - 100 } );  
    bigDiamond.setAttribute('scale',{x: 8, y: 15, z: 8});
    bigDiamond.setAttribute('material','color', palette[2]);
    // bigDiamond.setAttribute('scale-on-mouseenter', 'to:3 6 3');
    // bigDiamond.setAttribute('scale-on-mouseleave', 'to:2, 5, 2');
    // bigDiamond.setAttribute('cursor-listener', '');
    bigDiamond.setAttribute('rotate', '');
 
    bigDiamond.addEventListener('click', function(evt) {
            if(isStarted){
              if(score == pointsCount){
                  nextLevel();
              }
              //gameScene.removeChild(this);
              console.log(score);
            }     
          })
}

var startButton = document.getElementById('start-button');

startButton.addEventListener('click', function(){

  if(!isStarted){
    camera.setAttribute('position', '0 0 -60');
    camera.setAttribute('rotation', '0 0 0');
    displayScore.setAttribute('text','value', 'Level: ' + level + '  score: ' + score + ' / ' + pointsCount);  
    isStarted = true;
    //clean();
  }       
})

var timeOut = (limit) => {
  lim = limit;
  var timer = setInterval(function(){
    lim--;
    displayScore.setAttribute('text','value', 'Level: ' + level + '  score: ' + score + ' / ' + pointsCount 
    + "  Remaining time: " + lim );
    console.log(lim);  
    if(lim == 0){clearInterval(timer);}
  },1000)
}

var restart = () => {
  level = 1;
  score = 0;
  pointsCount = 0;
  started = false;
  clean();
  moveCameraToMenu();
  generateLevel(level); 
}

var nextLevel = () => {
  var limit = 20;
  level++;
  score = 0;
  pointsCount = 0;
  clean();
  moveCameraToBegin();
  generateLevel(level);
  displayScore.setAttribute('text','value', 'Level: ' + level + '  score: ' + score + ' / ' + pointsCount);  
}

var moveCameraToBegin = () => {
  camera.setAttribute('position', '0 0 -60');
  camera.setAttribute('rotation', '0 0 0');
}

var moveCameraToMenu = () => {
  camera.setAttribute('position', '0 3 10');
  camera.setAttribute('rotation', '0 0 0');
}

var clean = () => {
  for(var point of points){
      gameScene.removeChild(point);
  }

  for(var platform of platforms){
    gameScene.removeChild(platform);
  }

  // gameScene.removeChild(bigDiamond);
  // gameScene.removeChild(portal);

  platforms = [];
  points = [];
}

var generateLevel = (lvl) => {
    switch(lvl) {
      case(1):{
        createSteps(10);
        //timeOut(10*2);
        setPortalPosition();
        break;
      }
      case(2):{
        createSteps(30);
        timeOut(30*2);
        setPortalPosition();        
        break;
      }
      case(3):{
        createSteps(50);
        timeOut(50*2);
        setPortalPosition();        
        break;
      }
      case(4):{
        createSteps(80);
        timeOut(80*2);        
        setPortalPosition();        
        break;
      }
      default:{
        var dif = lvl+Math.floor(Math.random() * 200 + 100 );
        createSteps(dif);
        setTimeout(dif*2);
        setPortalPosition();        
        break;
      }
    }

} 

window.onload= function () {
  generateLevel(1);
  gameScene.appendChild(bigDiamond);  
  //setPortalPosition(); 
}