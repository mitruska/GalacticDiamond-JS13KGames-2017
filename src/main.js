let steps = [];
let camera = document.getElementById('gameCamera');
let gameScene = document.getElementById('scene2');
let pallette = ["rgb(238, 244, 66)","rgb(24, 89, 58)","rgb(89, 24, 46)"];

let points = [];
let score = 0;
let pointsCount = 0;

let isStarted = false;
let endPosition = 0;

let displayScore = document.getElementById('score');

//camera.setAttribute('animation', anim);

let createSteps = () => {
  let platformCount = 100;
  let radious = 100;

  let initX = 0.711; 
  let initY = 41.557;
  let initZ = -67.131;

  let deltaX = 0;
  let deltaY = 0;
  let deltaZ = 0;

  for(let i = 0; i<platformCount; i++){
    let point;
    let platform = document.createElement('a-sphere');;

    let newX = radious*Math.cos(deltaX);
    let newY = radious*Math.sin(deltaX);
    let newZ = initZ + deltaZ;

    let newColor = pallette[i%3];
    
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
          displayScore.setAttribute('text','value', 'score: ' + score + ' / ' + pointsCount);
          gameScene.removeChild(this);
  
          console.log(score);
        }     
      })

      gameScene.appendChild(point);
    }

    platform.addEventListener('click', function(evt) {

      if(isStarted) {
        let platformPos = platform.getAttribute('position');
        let anim = document.createElement('a-animation');

        anim.setAttribute('attribute', 'position');
        anim.setAttribute('from', camera.getAttribute('position'));
        //anim.setAttribute('to', ball.getAttribute('position'));
        anim.setAttribute('dur', 1000);
        anim.setAttribute('repeat', 1);

        anim.setAttribute('to', {x:platformPos.x, y:platformPos.y + 15, z:platformPos.z });
            
        //camera.appendChild(anim);
    
        camera.setAttribute('position', {x:platformPos.x, y:platformPos.y + 15, z:platformPos.z });  
      }     
    })

    deltaX+=20;
   // deltaY+=30;
    deltaZ+=-10;

    if(i==platformCount){
      platform.getAttribute('position');
    }

    console.log("making steps");
  }


}

let startButton = document.getElementById('start-button');

startButton.addEventListener('click', function(){

  if(!isStarted){
    camera.setAttribute('position', '0 0 -60');
    camera.setAttribute('rotation', '0 0 0');
    displayScore.setAttribute('text','value', 'score: ' + score + ' / ' + pointsCount);
    isStarted = true;
  }       
})



window.onload= function () {
  createSteps();
  //displayScore.setAttribute('text', 'value', ' ' );
}