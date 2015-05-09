/* jshint esnext: true */
var React = require('react');
var draw = require('../draw-utils');


var VERTICLES_NUM = 6;

var buildPoligone = function(start, size, type){
  var x = start.x;
  var y = start.y;

  var points = [];
  for (var i = 0; i <= VERTICLES_NUM; i++) {
    var ang = i * 2 * Math.PI / VERTICLES_NUM;
    points.push({
      x: x + size * Math.cos(ang),
      y: y + size * Math.sin(ang)
    });
    if (type === 'star'){
      var ang2 = ((i * 2) + 1) * Math.PI / VERTICLES_NUM;
      points.push({
        x: x + (size / 2) * Math.cos(ang2),
        y: y + (size / 2) * Math.sin(ang2)
      });
    }
  }

  return points;
};

var poligoneThirdWidth = function(size){
  return 3 * size * Math.cos(2 * Math.PI / VERTICLES_NUM);
};

var poligoneHalfHeight = function(size){
  return size * Math.sin(2 * Math.PI / VERTICLES_NUM);
};

var animation = 0;

var renderCanvas = function(canvas, type){
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var size = 20; // Segment length

  var dx = poligoneThirdWidth(size);
  var dy = poligoneHalfHeight(size);

  var nx = canvas.width / dx;
  var ny = canvas.height / (2 * dy);

  ctx.beginPath();

  for(var x = 0; x < nx; x++){
    for(var y = 0; y < ny; y++){
      var lx = x * dx;
      var ly = y * (2 * dy);
      if (x % 2 === 0){
        ly += dy;
      }
      var points = buildPoligone({x: lx, y: ly}, size, type);
      draw.drawLines(ctx, points);
    }
  }

  ctx.strokeStyle = 'rgb(0,' + Math.floor(255-(255*animation)) + ',0)';
  ctx.stroke();

  if (animation < 100){
    animation += 0.009;
    requestAnimationFrame(function(){
      renderCanvas(canvas, type);
    });
  }
};

var L1 = React.createClass({

  getInitialState: function(){
    return {
      type: 'hexagone'
    };
  },

  renderCanvas: function(type){
    var canvas = this.refs.canvas.getDOMNode();
    animation = 0;
    requestAnimationFrame(function(){
      renderCanvas(canvas, type);
    });
  },

  componentDidMount: function() {
    this.renderCanvas(this.state.type);
  },

  componentWillUpdate: function(nextProps, nextState) {
    this.renderCanvas(nextState.type);
  },

  render: function() {
    return <div>
        <form>
          <div className='form-group'>
            <select onChange={this.handleOptionChange}>
              <option value='hexagone'>Хексагон</option>
              <option value='star'>Зірка</option>
            </select>
          </div>
        </form>
        <div>
          <canvas ref='canvas' width={600} height={400} style={{borderColor: 'gray', borderThickness: '1', borderStyle: 'solid'}} ></canvas>
        </div>
      </div>;
  },

  handleOptionChange: function(e){
    this.setState({ type: e.target.value });
  }
});

exports.L1 = L1;
