/* jshint esnext: true */
var React = require('react');
var assert = require('assert');
var mat4 = require('gl-matrix').mat4;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function rad(degrees) {
    return degrees * Math.PI / 180;
}

function compileShader(gl, type, src){
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader));
      return null;
  }

  return shader;
}

function prepareBuffer(gl, size, vertices){
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  buffer.itemSize = size;
  buffer.numItems = vertices.length / size;

  return buffer;
}

var buildPoligoneVertices = function(min, max, num){

  var vertices = [];
  for (var i = 0; i <= num; i++) {
    var ang = i * 2 * Math.PI / num;
    var d = rand(min, max);
    vertices = vertices.concat([
      d * Math.cos(ang),
      d * Math.sin(ang),
      0.0]);
  }

  return vertices;
};

var L4_0 = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  initCanvas: function(){
    if (this.refs.canvas){
      var canvas = this.refs.canvas.getDOMNode();
      var gl = this.gl = canvas.getContext("webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

      var mvMatrix = this.mvMatrix = mat4.create();
      var pMatrix = this.pMatrix = mat4.create();

      // Init shaders
      var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, `
        precision mediump float;

        varying vec4 vColor;

        void main(void) {
            gl_FragColor = vColor;
        }
      `);
      var vertexShader = compileShader(gl, gl.VERTEX_SHADER, `
        attribute vec3 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        varying vec4 vColor;

        void main(void) {
          gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
          vColor = aVertexColor;
        }
      `);

      var shaderProgram = this.shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Could not initialise shaders");
      }

      gl.useProgram(shaderProgram);

      shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

      shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
      gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

      shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
      shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

      // //positions: prepareBuffer(gl, 3, buildPoligoneVertices(0.3, 1.2, 6))

      // Init figures
      this.figures = [{
        mode: gl.TRIANGLES,
        positions: prepareBuffer(gl, 3, [
           0.0, -1.0, 0.0,
           -3.0, -3.0, 0.0,
           -1.0, -3.0, 0.0
        ]),
        colors: prepareBuffer(gl, 4, [
          1.0, 0.0, 0.0, 1.0,
          0.0, 1.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 1.0
        ]),
      },{
        mode: gl.TRIANGLE_STRIP,
        positions: prepareBuffer(gl, 3, [
           3.0, 3.0, 0.0,
           1.0, 3.0, 0.0,
           3.0, 1.0, 0.0,
           1.0, 1.0, 0.0
        ]),
        colors: prepareBuffer(gl, 4, [
          0.2, 0.5, 1.0, 1.0,
          0.2, 0.5, 1.0, 1.0,
          0.2, 0.5, 1.0, 1.0,
          0.2, 0.5, 1.0, 1.0
        ]),
      }];

      // Clenup
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
    }
  },

  renderFigure: function(f){
    assert(this.gl, 'GL context should be initialized');

    var gl = this.gl;
    var mvMatrix = this.mvMatrix;
    var pMatrix = this.pMatrix;
    var shaderProgram = this.shaderProgram;

    gl.bindBuffer(gl.ARRAY_BUFFER, f.positions);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, f.positions.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, f.colors);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, f.colors.itemSize, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    gl.drawArrays(f.mode, 0, f.positions.numItems);
  },

  renderCanvas: function(){

    var gl = this.gl;
    var mvMatrix = this.mvMatrix;
    var pMatrix = this.pMatrix;
    var renderBuffer = this.renderBuffer;
    var shaderProgram = this.shaderProgram;

    // Draw scene!
    gl.viewport(0, 0, this.width, this.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(pMatrix, 45.0, this.width / this.height, 0.1, 100.0);

    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -7.0]);

    // Draw figure
    // Mirror
    // Draw figure again...

    var num = 4;
    for(var i = 0; i < num; i++){
      mat4.rotate(mvMatrix, mvMatrix, rad(360/num), [0, 0, 1]);
      if (i%2 === 0){
        mat4.scale(mvMatrix, mvMatrix, [-1.0, 1.0, 1.0]);
      }

      this.figures.forEach(this.renderFigure);
    }

  },

  componentDidMount: function() {

    var canvas = this.refs.canvas.getDOMNode();
    this.width = canvas.width;
    this.height = canvas.height;

    canvas.addEventListener("mousedown", this.handleMouseClick, false);

    this.initCanvas();
    this.renderCanvas();
  },

  handleMouseClick: function(e){
    var x = e.x;
    var y = e.y;
    var canvas = this.refs.canvas.getDOMNode();

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    // Do something when click
  },

  componentWillUpdate: function(nextProps, nextState) {
  },

  render: function() {
    return <div>
          <canvas ref='canvas' width={600} height={400} style={{borderColor: 'gray', borderThickness: '1', borderStyle: 'solid'}} ></canvas>
      </div>;
  }
});

exports.L4_0 = L4_0;
