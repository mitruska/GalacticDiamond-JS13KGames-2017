let steps = [];
let gameScene = document.getElementById('scene2');
let pallette = ["rgb(238, 244, 66)","rgb(24, 89, 58)","rgb(89, 24, 46)"];

//camera.setAttribute('animation', anim);

let createSteps = () => {
  let initX = 0.711; 
  let initY = 41.557;
  let initZ = -67.131;

  let deltaX = 0;
  let deltaY = 0;
  let deltaZ = 0;
// let deltaY = 100;
// let deltaZ = -10;

  for(let i = 0; i<100; i++){
    let step = document.createElement('a-box');
    let ball = document.createElement('a-sphere');

    let newX = 100*Math.cos(deltaX);
    let newY = 100*Math.sin(deltaX);
    //let newY = Math.sqrt(Math.pow(10) - Math.pow(newX));

//     float x = r*cos(t) + h;
// float y = r*sin(t) + k;

    let newZ = initZ + deltaZ;

    //let newColor = pallette[Math.floor(Math.random()*pallette.length)];
    let newColor = pallette[i%3];

    ball.setAttribute('position',{x:newX, y:newY, z:newZ});
    //step.setAttribute('position',{x: initX+deltaX, y: initY+deltaY, z: initZ+deltaZ});
    step.setAttribute('scale',{x: 23.122, y: 2.125, z: 14.093});
    //step.setAttribute('material','color', newColor);
    step.setAttribute('scale-on-mouseenter', 'to:30 3 20');
    step.setAttribute('scale-on-mouseleave', 'to:23.122, 2.125, 14.093');
    step.setAttribute('cursor-listener', '');

    // gameScene.appendChild(step);
    // step.appendChild(ball);

    //ball.setAttribute('position',{x: initX+deltaX, y: initY+deltaY, z: initZ+deltaZ});
    ball.setAttribute('scale',{x: 23.122, y: 4.125, z: 14.093});
    // ball.setAttribute('material','color','red');
    ball.setAttribute('scale-on-mouseenter', 'to:30 3 20');
    ball.setAttribute('scale-on-mouseleave', 'to:23.122, 2.125, 14.093');
    // ball.setAttribute('cursor-listener', '');
    ball.setAttribute('material','color', newColor);
    //ball.setAttribute('material', 'color', 'rgb(35, 125,104)');
    ball.setAttribute('material', 'metalness', '0.5');
    // ball.setAttribute('material', 'opacity', '0.3');
    gameScene.appendChild(ball);
    

    ball.addEventListener('click', function(evt) {
        let camera = document.getElementById('gameCamera');
        let anim = document.createElement('a-animation');

        anim.setAttribute('attribute', 'position');
        anim.setAttribute('from', camera.getAttribute('position'));
        anim.setAttribute('to', ball.getAttribute('position'));
        anim.setAttribute('dur', 1000);
        anim.setAttribute('repeat', 1);

        //anim.play();

        let platformPos = ball.getAttribute('position');

        camera.setAttribute('position', {x:platformPos.x, y:platformPos.y + 15, z:platformPos.z });
    })


    deltaX+=20;
   // deltaY+=30;
    deltaZ+=-10;

    console.log("making steps");
  }
}

window.onload=createSteps();