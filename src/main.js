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
    console.log(progress);
    this.el.setAttribute('position', {x: toX, y: toY, z: toZ});
    console.log(this.el.getAttribute('position').x);

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