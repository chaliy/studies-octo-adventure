/* jshint esnext: true */
var React = require('react');
var assert = require('assert');
var mat4 = require('gl-matrix').mat4;
require('es6-shim');

var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randf(min, max) {
  return Math.random() * (max - min) + min;
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

function prepareArrayBuffer(gl, size, vertices){
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  buffer.itemSize = size;
  buffer.numItems = vertices.length / size;

  return buffer;
}

function prepareElementArrayBuffer(gl, size, vertices){
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices), gl.STATIC_DRAW);
  buffer.itemSize = size;
  buffer.numItems = vertices.length / size;

  return buffer;
}

function prepareTexture(gl, src){
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([255, 255, 255, 255]));

  texture.image = new Image();
  texture.image.onload = function () {

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    gl.bindTexture(gl.TEXTURE_2D, null);
  };

  texture.image.src = src;

  return texture;
}

function prepareColorTexture(gl, color){
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array(color));

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return texture;
}

function buildCorneredFigure(gl){

  var zd = rand(0.1,0.5);
  var centerZ = zd;
  var arrisZ = zd;
  var lowerZ = zd;

  var num = rand(1,4) * 4;
  var x = randf(-1.0, 5.0);
  var y = randf(-1.0, 5.0);
  var size = randf(0.5, 1.5);
  var size2 = randf(size/4, size*0.7);
  var color = [rand(1, 255), rand(1, 255), rand(1, 255), rand(126, 255)];

  var vertices = [];
  var indices = [];
  for (var i = 0; i <= num; i++) {
    var ang = i * 2 * Math.PI / num;
    vertices.push(x, y, centerZ);
    vertices.push(
      x + size * Math.cos(ang),
      y + size * Math.sin(ang),
      arrisZ
    );
    var ang2 = ((i * 2) + 1) * Math.PI / num;
    vertices.push(
      x + size2 * Math.cos(ang2),
      y + size2 * Math.sin(ang2),
      lowerZ
    );
    vertices.push(x, y, centerZ);
    vertices.push(
      x + size2 * Math.cos(ang2),
      y + size2 * Math.sin(ang2),
      lowerZ
    );
    var ang3 = ((i * 2) + 2) * Math.PI / num;
    vertices.push(
      x + size * Math.cos(ang3),
      y + size * Math.sin(ang3),
      arrisZ
    );
  }

  var textureCoords = Array.from({length: (vertices.length / 3) * 2}, (v, k) => 1.0);

  return {
    mode: gl.TRIANGLES,
    positions: prepareArrayBuffer(gl, 3, vertices),
    textureCoords: prepareArrayBuffer(gl, 2, textureCoords),
    texture: prepareColorTexture(gl, color),
    x: x,
    y: y
  };
}

var L4 = React.createClass({

  getInitialState: function(){
    return {
      angle: 45,
      rotation: 0
    };
  },

  initCanvas: function(){
    if (this.refs.canvas){
      var canvas = this.refs.canvas.getDOMNode();
      var gl = this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      this.width = canvas.width;
      this.height = canvas.height;
      gl.viewport(0, 0, this.width, this.height);

      var mvMatrix = this.mvMatrix = mat4.create();
      var pMatrix = this.pMatrix = mat4.create();

      // Init shaders
      var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, `
        precision mediump float;

        varying vec2 vTextureCoord;

        uniform sampler2D uSampler;

        void main(void) {
            gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        }
      `);
      var vertexShader = compileShader(gl, gl.VERTEX_SHADER, `
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        varying vec2 vTextureCoord;


        void main(void) {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            vTextureCoord = aTextureCoord;
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

      shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

      shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
      shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
      shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

      // Init figures
      this.figures = [{
        mode: gl.TRIANGLES,
        positions: prepareArrayBuffer(gl, 3, [
           3.0, 3.0, 0.0,
           1.0, 3.0, 0.0,
           3.0, 1.0, 0.0,
           1.0, 1.0, 0.0
        ]),
        textureCoords: prepareArrayBuffer(gl, 2, [
          1.0, 1.0,
          0.0, 1.0,
          1.0, 0.0,
          0.0, 0.0
        ]),
        texture: prepareTexture(gl, 'assets/geom.png'),
        indices: prepareElementArrayBuffer(gl, 1, [
          0, 1, 2,      2, 3, 1
        ])
      },
      buildCorneredFigure(gl),
      buildCorneredFigure(gl),
      buildCorneredFigure(gl)];

      // Clenup
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
    }
  },

  mvMatrixStack: [],
  _pushMvMatrix: function () {
      var copy = mat4.create();
      mat4.copy(copy, this.mvMatrix);
      this.mvMatrixStack.push(copy);
  },

  _popMvMatrix: function() {
      if (this.mvMatrixStack.length === 0) {
          throw "Invalid popMatrix!";
      }
      this.mvMatrix = this.mvMatrixStack.pop();
  },

  renderFigure: function(f){
    assert(this.gl, 'GL context should be initialized');

    var gl = this.gl;
    var shaderProgram = this.shaderProgram;

    gl.bindBuffer(gl.ARRAY_BUFFER, f.positions);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, f.positions.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, f.textureCoords);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, f.textureCoords.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, f.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);


    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);

    if (f.indices){
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, f.indices);

      gl.drawElements(f.mode, f.indices.numItems, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(f.mode, 0, f.positions.numItems);
    }
  },

  renderCanvas: function(){
    var gl = this.gl;
    var renderBuffer = this.renderBuffer;
    var shaderProgram = this.shaderProgram;

    gl.viewport(0, 0, this.width, this.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(this.pMatrix, 45.0, this.width / this.height, 0.1, 100.0);

    for(let f of this.figures){
      mat4.identity(this.mvMatrix);

      mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, -7.0]);
      mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, 0.001]);

      var rotation = this.state.rotation;
      mat4.rotate(this.mvMatrix, this.mvMatrix, rad(rotation), [1, 0, 0]);
      mat4.rotate(this.mvMatrix, this.mvMatrix, rad(rotation), [0, 1, 0]);
      mat4.rotate(this.mvMatrix, this.mvMatrix, rad(rotation), [0, 0, 1]);

      var num = 16;
      mat4.rotate(this.mvMatrix, this.mvMatrix, rad(this.state.angle), [0, 0, 1]);
      for(var i = 0; i < num; i++){
        mat4.rotate(this.mvMatrix, this.mvMatrix, rad(360/num), [0, 0, 1]);
        mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, 0.001]);
        this._pushMvMatrix();
        if (i%2 === 0){
          mat4.scale(this.mvMatrix, this.mvMatrix, [-1.0, 1.0, 1.0]);
        }

        this.renderFigure(f);

        this._popMvMatrix();

      }
    }
  },

  queueRenderCanvas: function(){
    var self = this;
    requestAnimationFrame(function(){
      self.renderCanvas();
    });
  },

  componentDidMount: function() {

    var canvas = this.refs.canvas.getDOMNode();
    this.width = canvas.width;
    this.height = canvas.height;

    canvas.addEventListener("mousedown", this.handleMouseClick, false);

    this.initCanvas();
    this.renderCanvas();

    var self = this;

    // Hack to ensure textures loaded
    window.setTimeout(this.queueRenderCanvas, 500);
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
    this.queueRenderCanvas();
  },

  render: function() {
    return <div className='container'>
      <div className='row'>
        <div className='col-md-8'><canvas ref='canvas' width={600} height={400} style={{borderColor: 'gray', borderThickness: '1', borderStyle: 'solid'}} ></canvas></div>
        <div className='col-md-4'>
          <form>
            <Input name='angle' type='range' step='any' min='0' max='90' label='Кут' onChange={this._handleChange} />
            <Input name='rotation' type='range' step='any' min='-90' max='90' label='Обертання' onChange={this._handleChange} />
          </form>
        </div>
      </div>
    </div>;
  },
  _handleChange: function(e){    
    var patch = {};
    patch[e.target.name] = e.target.value;
    this.setState(patch);
  }
});

exports.L4 = L4;
