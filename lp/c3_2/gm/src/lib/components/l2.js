/* jshint esnext: true */
var React = require('react');

var renderCanvas = function(canvas, rects){
  var ctx = canvas.getContext('2d');
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgb(0,0,0)';

  rects.forEach(function(rect){
    ctx.setTransform(rect.scale, 0, 0, rect.scale, rect.x, rect.y);
    ctx.stroke(rect.path);
  });
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var L2 = React.createClass({

  rects: [],

  getInitialState: function(){
    return {
    };
  },

  genRect: function(x, y){
    if(typeof x === 'undefined') {x = rand(25, this.width - 100);}
    if(typeof y === 'undefined') {y = rand(25, this.height - 100);}

    var size = rand(5, 50);

    var path = new Path2D();
    path.rect(-size/2, -size/2, size, size);

    return {
      path: path,
      scale: 1,
      x: x,
      y: y,
      size: size
    };
  },

  initRectangles: function(){
    this.rects = [];

    for(var i = 0; i < 20; i ++) {
      this.rects.push(this.genRect());
    }
    this.renderCanvas();
  },

  next: function(){
    var width = this.width;
    var height = this.height;

    // Remove intersecions
    var sorted = this.rects.slice(0).sort(function(a, b){
      return b.size * b.scale - a.size * a.scale;
    });

    var rects = [];
    // TODO Remove stupid O(n^2)
    for(var i = 0; i < sorted.length; i++){
      var r = sorted[i];
      var kill = false;
      for(var j = 0; j < rects.length; j++){
        var o = rects[j];
        var rs = r.size * r.scale;
        var rx = r.x - rs/2;
        var ry = r.y - rs/2;
        var os = o.size * o.scale;
        var ox = o.x - os/2;
        var oy = o.y - os/2;
        if (!(rx + rs < ox || ox + os < rx || ry + rs < oy || oy + os < ry)){
          kill = true;
          break;
        }
      }
      if (!kill){
        rects.push(r);
      }
    }

    rects.forEach(function(r){

      // Grow all rects
      r.scale *= 1.01;

      // Esnure items does not move outside of the area
      var blank = 5;
      var rs = r.size * r.scale;
      var rx = r.x - rs/2;
      if (rx < 0){
        r.x += (0 - rx);
      } else if (rx + rs > width) {
        r.x -= (rx + rs - width);
      }
      var ry = r.y - rs/2;
      if (ry < 0){
        r.y += (0 - ry);
      }
      if (ry + rs > height) {
        r.y -= (ry + rs - height);
      }
    });

    this.rects = rects;

    this.renderCanvas();

    if (this.rects.length <= 1){
      clearInterval(this.nextIntervalId);
    }
  },

  renderCanvas: function(){
    if (this.refs.canvas){
      var canvas = this.refs.canvas.getDOMNode();
      var rects = this.rects;
      requestAnimationFrame(function(){
        renderCanvas(canvas, rects);
      });
    }
  },

  componentDidMount: function() {

    var canvas = this.refs.canvas.getDOMNode();
    this.width = canvas.width;
    this.height = canvas.height;

    canvas.addEventListener("mousedown", this.handleMouseClick, false);

    this.initRectangles();
    this.nextIntervalId = setInterval(this.next, 100);
  },

  handleMouseClick: function(e){
    var x = e.x;
    var y = e.y;
    var canvas = this.refs.canvas.getDOMNode();

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    this.rects.push(this.genRect(x, y));
  },

  componentWillUpdate: function(nextProps, nextState) {
  },

  render: function() {
    return <div>
          <canvas ref='canvas' width={600} height={400} style={{borderColor: 'gray', borderThickness: '1', borderStyle: 'solid'}} ></canvas>
      </div>;
  }
});

exports.L2 = L2;
