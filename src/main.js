// import "./components.js"
//import "./3dtext.min.js"

var camera = document.getElementById('gameCamera');
var gameScene = document.getElementById('gameScene');
var portal = document.getElementById('portal');
var bigDiamond = document.createElement('a-octahedron');

var palette = ["rgb(238, 244, 66)","rgb(32, 125, 104)","rgb(89, 24, 46)"];

var points = [];
var platforms = [];
var stars = [];
var score = 0;
var pointsCount = 0;
var level = 0;
var lim = 0; 

var isStarted = false;
var isWon = false;
var endPositionZ = 0;
var display3dScore = document.getElementById('display3dscore');
var display3dLevel = document.getElementById('display3dlvl');
var display3dTime = document.getElementById('display3dtime');

var displayRestartInfo = document.getElementById('restart-info');

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
    var star = document.createElement('a-sphere');
    
    stars.push(star);
    platforms.push(platform);

    var newX = radious*Math.cos(deltaX);
    var newY = radious*Math.sin(deltaX);
    var newZ = initZ + deltaZ;
 
    var newColor = palette[i%3];
    
    star.setAttribute('position',{x:newX*1.5, y:newY*1.5, z:newZ});
    star.setAttribute('material','metalness', '0.1');
    star.setAttribute('follow', '');
    gameScene.appendChild(star);

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
      point.setAttribute('position',{x:newX-8, y:newY+10, z:newZ});
      point.setAttribute('scale',{x: 2, y: 5, z: 2});
      point.setAttribute('material','color', '#38e4be');
      point.setAttribute('scale-on-mouseenter', 'to:3 6 3');
      point.setAttribute('scale-on-mouseleave', 'to:2, 5, 2');
      point.setAttribute('rotate', '');

      point.addEventListener('click', function(evt) {
        if(isStarted){
          score++;
          display3dScore.setAttribute('text-geometry','value', score + '/' + pointsCount);  

          // displayScore.setAttribute('text','value', 'Level: ' + level + '  score: ' + score + ' / ' + pointsCount);  
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
  }
}

var setPortalPosition = () => {
    portal.setAttribute('position', {x: 0, y: 0, z: endPositionZ - 100 } );
    portal.setAttribute('scale', {x: 50, y: 50, z: 20});
    
    bigDiamond.setAttribute('position', {x: 0, y: 11, z: endPositionZ - 100 } );  
    bigDiamond.setAttribute('scale',{x: 8, y: 15, z: 8});
    bigDiamond.setAttribute('material','color', palette[2]);

    display3dScore.setAttribute('position', {x: -30, y: 80, z: endPositionZ - 100 } );
    display3dTime.setAttribute('position', {x: -30, y: -95, z: endPositionZ - 100 } );
    display3dLevel.setAttribute('position', {x: -12, y: -28, z: endPositionZ - 100 } );

    display3dTime.setAttribute('material','color', palette[1]);
    display3dLevel.setAttribute('material','color', palette[2]);

    bigDiamond.setAttribute('scale-on-mouseenter', 'to:10 18 10');
    bigDiamond.setAttribute('scale-on-mouseleave', 'to:8, 15, 8');
    bigDiamond.setAttribute('rotate', '');
 
    bigDiamond.addEventListener('click', function(evt) {
        if(isStarted){
          if(score == pointsCount){
              nextLevel();
          }
          console.log(score);
        }     
      })
}

var startButton = document.getElementById('start-button');
startButton.addEventListener('click', function(){

  if(!isStarted){
    camera.setAttribute('position', '0 0 -60');
    camera.setAttribute('rotation', '0 0 0');

    display3dScore.setAttribute('text-geometry','value', score + '/' + pointsCount); 
    display3dLevel.setAttribute('text-geometry','value',  level);

    isStarted = true;
    nextLevel();
  }       
})

var timer;
var timeOut = (limit) => {
  lim = limit;
  timer = setInterval(function(){
    lim--;
    display3dTime.setAttribute('text-geometry','value', 'T ' + lim ); 
    
    if(lim == 0 || lim == -1){
      clearInterval(this);
      restart();
    }
  },1000)
}

var restart = () => {
  level = 0;
  score = 0;
  pointsCount = 0;
  isStarted = false;
  display3dScore.setAttribute('text-geometry','value', ' ');
  display3dLevel.setAttribute('text-geometry','value',  ' ');
  display3dTime.setAttribute('text-geometry','value', ' ' ); 
  
  displayRestartInfo.setAttribute('text','value', 'BE FASTER' ); 
  
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
  display3dScore.setAttribute('text-geometry','value', score + '/' + pointsCount);
  display3dLevel.setAttribute('text-geometry','value',  level);
  display3dTime.setAttribute('text-geometry','value', ' ' );   
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

  platforms = [];
  points = [];

  if(stars.length>1000){
    for(var i=0; i<500; i++){
      stars.splice(stars[i],1);
      gameScene.removeChild(star[i]);
    }
  }
}

var generateLevel = (lvl) => {
    switch(lvl) {
      case(0):{
        createSteps(50);
        setPortalPosition();
        break;
      }
      case(1):{
        createSteps(10);
        clearInterval(timer);
        timeOut(25);
        setPortalPosition();
        break;
      }
      case(2):{
        createSteps(30);
        clearInterval(timer);
        timeOut(30);
        setPortalPosition();        
        break;
      }
      case(3):{
        createSteps(50);
        clearInterval(timer);
        timeOut(40);
        setPortalPosition();        
        break;
      }
      case(4):{
        createSteps(80);
        clearInterval(timer);
        timeOut(70);        
        setPortalPosition();        
        break;
      }
      default:{
        var dif = lvl+Math.floor(Math.random() * 200 + 100 );
        createSteps(dif);
        clearInterval(timer);
        timeOut(dif*2);
        setPortalPosition();        
        break;
      }
    }
} 

window.onload= function () {
  generateLevel(0);
  gameScene.appendChild(bigDiamond);  
}