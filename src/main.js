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