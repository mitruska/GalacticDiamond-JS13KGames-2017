AFRAME.registerComponent('scale-on-mouseenter', {
    schema: {
      to: {default: '2.5 2.5 2.5'}
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('mouseenter', function () {
        this.setAttribute('scale', data.to);
      });
    }
  });

  AFRAME.registerComponent('scale-on-mouseleave', {
    schema: {
      to: {default: '1 1 1'}
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('mouseleave', function () {
        this.setAttribute('scale', data.to);
      });
    }
  });


  AFRAME.registerComponent('move-to', {
    schema: {
      to: {default: '2.5 2.5 2.5'}
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('mouseenter', function () {
        this.setAttribute('scale', data.to);
      });
    }
  });

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      var randomIndex = Math.floor(Math.random() * COLORS.length);
      this.setAttribute('material', 'color', COLORS[randomIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});



AFRAME.registerComponent('select-on-fuse', {
    schema: {
      to: {default: '2.5 2.5 2.5'}
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('click', function () {
        this.setAttribute('rotation', data.to);
      });
    }
  });


AFRAME.registerComponent('follow', {
  schema: {speed: {default: '2'}},

  init: function () {

 
  },
   update: function () {

  },

  tick: function (time, timeDelta) {
    let progress = this.el.getAttribute('position');
    let toX = progress.x-0.01;
    let toY = progress.y;
    let toZ = progress.z+0.01;
    // console.log(progress);
    this.el.setAttribute('position', {x: toX, y: toY, z: toZ});
    // console.log(this.el.getAttribute('position').x);

  }
});

let back = false;
let reverse = false;
AFRAME.registerComponent('follow-circle', {

  schema: {
    rootA: {default: '0'},
    rootB: {default: '0'},
    rootRadius: {default: '3'},
    speed: {default: '0.01'}
},

  init: function () {
    let pos = this.el.getAttribute('position');
    let initX = this.data.rootA - this.data.rootRadius;
    let initY = this.data.rootB;
    let initZ = pos.z;
    this.el.setAttribute('position', {x: initX, y: initY, z: initZ});
  },
   update: function () {

  },

  tick: function (time, timeDelta) {
    let progress = this.el.getAttribute('position');
    let toX;
    let toY;
    let toZ = progress.z;
    
    // console.log(progress.x);
    // console.log(this.data.rootA);
    if( Math.abs((this.data.rootA + this.data.rootRadius) - progress.x) < 0.001 ){
      back = false;
      reverse = false;
    }

    if(Math.abs(progress.x - (this.data.rootA - this.data.rootRadius))<0.001){
      back = true;
      reverse = false;
    }
    if(Math.abs(this.data.rootA - progress.x)<0.001){
      reverse = true;
    }

    if(back){
      toX = progress.x - this.data.speed;
    }
    else {
      toX = progress.x + this.data.speed;
    }

    if(reverse){
      toY = this.data.rootB + Math.sqrt(Math.pow(this.data.rootRadius,2) - Math.pow((toX-this.data.rootA),2));
    } 
    else {
      toY = this.data.rootB - Math.sqrt(Math.pow(this.data.rootRadius,2) - Math.pow((toX-this.data.rootA),2));
    }
      
    this.el.setAttribute('position', {x: toX, y: toY, z: toZ});
    // console.log(reverse);
    // console.log(back);

  }
});

 AFRAME.registerComponent('random-torus-knot', {
        init: function () {
          this.el.setAttribute('geometry', {
            primitive: 'torusKnot',
            radius: Math.random() * 10,
            radiusTubular: Math.random() * .75,
            p: Math.round(Math.random() * 10),
            q: Math.round(Math.random() * 10)
          });
        }
      });


      function nextScene() {
        console.log("next")
    document.getElementById('scene1').setAttribute('visible', 'false');
    document.getElementById('scene2').setAttribute('visible', 'true');
    document.querySelector("a-sky").setAttribute('color','black');
  };






  /////////////////////////////////////////////// GamePlay
