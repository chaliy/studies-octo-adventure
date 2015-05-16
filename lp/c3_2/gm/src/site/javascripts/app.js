(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
'use strict';
var React = require('react');
var es6 = require('es6-shim');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;
var ButtonLink = ReactRouterBootstrap.ButtonLink;
var About = require('./components/about').About;
var L1 = require('./components/l1').L1;
var L2 = require('./components/l2').L2;
var L4 = require('./components/l4').L4;
var App = React.createClass({
  displayName: "App",
  render: function() {
    return (React.createElement("div", null, React.createElement(Navbar, {brand: "DM"}, React.createElement(Nav, null, React.createElement(NavItemLink, {to: "l1"}, "L1"), React.createElement(NavItemLink, {to: "l2"}, "L2"), React.createElement(NavItemLink, {to: "l4"}, "L4"), React.createElement(NavItemLink, {to: "about"}, "Про программу..."))), React.createElement("div", {className: "container"}, React.createElement(RouteHandler, null))));
  }
});
var routes = (React.createElement(Route, {
  handler: App,
  path: "/"
}, React.createElement(Route, {
  name: "l1",
  path: "l1",
  handler: L1
}), React.createElement(Route, {
  name: "l2",
  path: "l2",
  handler: L2
}), React.createElement(Route, {
  name: "l4",
  path: "l4",
  handler: L4
}), React.createElement(Route, {
  name: "about",
  path: "about",
  handler: About
})));
Router.run(routes, function(Handler) {
  React.render(React.createElement(Handler, null), document.body);
});


//# sourceURL=C:/Users/Mike/Projects/studies-octo-adventure/lp/c3_2/gm/src/lib/site.js
},{"./components/about":2,"./components/l1":3,"./components/l2":4,"./components/l4":5,"es6-shim":"es6-shim","react":"react","react-bootstrap":"react-bootstrap","react-router":"react-router","react-router-bootstrap":"react-router-bootstrap"}],2:[function(require,module,exports){
"use strict";
var React = require('react');
var About = React.createClass({
  displayName: "About",
  render: function() {
    return React.createElement("div", {className: "jumbotron"}, React.createElement("h1", null, "Михайло Чалий"), React.createElement("p", null, "Студент гр. НКз-31"), React.createElement("p", null, React.createElement("a", {href: "mailto:mike@chaliy.name"}, "mike@chaliy.name")));
  }
});
exports.About = About;


//# sourceURL=C:/Users/Mike/Projects/studies-octo-adventure/lp/c3_2/gm/src/lib/components/about.js
},{"react":"react"}],3:[function(require,module,exports){
"use strict";
var React = require('react');
var draw = require('../draw-utils');
var VERTICLES_NUM = 6;
var buildPoligone = function(start, size, type) {
  var x = start.x;
  var y = start.y;
  var points = [];
  for (var i = 0; i <= VERTICLES_NUM; i++) {
    var ang = i * 2 * Math.PI / VERTICLES_NUM;
    points.push({
      x: x + size * Math.cos(ang),
      y: y + size * Math.sin(ang)
    });
    if (type === 'star') {
      var ang2 = ((i * 2) + 1) * Math.PI / VERTICLES_NUM;
      points.push({
        x: x + (size / 2) * Math.cos(ang2),
        y: y + (size / 2) * Math.sin(ang2)
      });
    }
  }
  return points;
};
var poligoneThirdWidth = function(size) {
  return 3 * size * Math.cos(2 * Math.PI / VERTICLES_NUM);
};
var poligoneHalfHeight = function(size) {
  return size * Math.sin(2 * Math.PI / VERTICLES_NUM);
};
var animation = 0;
var renderCanvas = function(canvas, type) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var size = 20;
  var dx = poligoneThirdWidth(size);
  var dy = poligoneHalfHeight(size);
  var nx = canvas.width / dx;
  var ny = canvas.height / (2 * dy);
  ctx.beginPath();
  for (var x = 0; x < nx; x++) {
    for (var y = 0; y < ny; y++) {
      var lx = x * dx;
      var ly = y * (2 * dy);
      if (x % 2 === 0) {
        ly += dy;
      }
      var points = buildPoligone({
        x: lx,
        y: ly
      }, size, type);
      draw.drawLines(ctx, points);
    }
  }
  ctx.strokeStyle = 'rgb(0,' + Math.floor(255 - (255 * animation)) + ',0)';
  ctx.stroke();
  if (animation < 100) {
    animation += 0.009;
    requestAnimationFrame(function() {
      renderCanvas(canvas, type);
    });
  }
};
var L1 = React.createClass({
  displayName: "L1",
  getInitialState: function() {
    return {type: 'hexagone'};
  },
  renderCanvas: function(type) {
    var canvas = this.refs.canvas.getDOMNode();
    animation = 0;
    requestAnimationFrame(function() {
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
    return React.createElement("div", null, React.createElement("form", null, React.createElement("div", {className: "form-group"}, React.createElement("select", {onChange: this.handleOptionChange}, React.createElement("option", {value: "hexagone"}, "Хексагон"), React.createElement("option", {value: "star"}, "Зірка")))), React.createElement("div", null, React.createElement("canvas", {
      ref: "canvas",
      width: 600,
      height: 400,
      style: {
        borderColor: 'gray',
        borderThickness: '1',
        borderStyle: 'solid'
      }
    })));
  },
  handleOptionChange: function(e) {
    this.setState({type: e.target.value});
  }
});
exports.L1 = L1;


//# sourceURL=C:/Users/Mike/Projects/studies-octo-adventure/lp/c3_2/gm/src/lib/components/l1.js
},{"../draw-utils":6,"react":"react"}],4:[function(require,module,exports){
"use strict";
var React = require('react');
var renderCanvas = function(canvas, rects) {
  var ctx = canvas.getContext('2d');
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgb(0,0,0)';
  rects.forEach(function(rect) {
    ctx.setTransform(rect.scale, 0, 0, rect.scale, rect.x, rect.y);
    ctx.stroke(rect.path);
  });
};
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var L2 = React.createClass({
  displayName: "L2",
  rects: [],
  getInitialState: function() {
    return {};
  },
  genRect: function(x, y) {
    if (typeof x === 'undefined') {
      x = rand(25, this.width - 100);
    }
    if (typeof y === 'undefined') {
      y = rand(25, this.height - 100);
    }
    var size = rand(5, 50);
    var path = new Path2D();
    path.rect(-size / 2, -size / 2, size, size);
    return {
      path: path,
      scale: 1,
      x: x,
      y: y,
      size: size
    };
  },
  initRectangles: function() {
    this.rects = [];
    for (var i = 0; i < 20; i++) {
      this.rects.push(this.genRect());
    }
    this.renderCanvas();
  },
  next: function() {
    var width = this.width;
    var height = this.height;
    var sorted = this.rects.slice(0).sort(function(a, b) {
      return b.size * b.scale - a.size * a.scale;
    });
    var rects = [];
    for (var i = 0; i < sorted.length; i++) {
      var r = sorted[i];
      var kill = false;
      for (var j = 0; j < rects.length; j++) {
        var o = rects[j];
        var rs = r.size * r.scale;
        var rx = r.x - rs / 2;
        var ry = r.y - rs / 2;
        var os = o.size * o.scale;
        var ox = o.x - os / 2;
        var oy = o.y - os / 2;
        if (!(rx + rs < ox || ox + os < rx || ry + rs < oy || oy + os < ry)) {
          kill = true;
          break;
        }
      }
      if (!kill) {
        rects.push(r);
      }
    }
    rects.forEach(function(r) {
      r.scale *= 1.01;
      var blank = 5;
      var rs = r.size * r.scale;
      var rx = r.x - rs / 2;
      if (rx < 0) {
        r.x += (0 - rx);
      } else if (rx + rs > width) {
        r.x -= (rx + rs - width);
      }
      var ry = r.y - rs / 2;
      if (ry < 0) {
        r.y += (0 - ry);
      }
      if (ry + rs > height) {
        r.y -= (ry + rs - height);
      }
    });
    this.rects = rects;
    this.renderCanvas();
    if (this.rects.length <= 1) {
      clearInterval(this.nextIntervalId);
    }
  },
  renderCanvas: function() {
    if (this.refs.canvas) {
      var canvas = this.refs.canvas.getDOMNode();
      var rects = this.rects;
      requestAnimationFrame(function() {
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
  handleMouseClick: function(e) {
    var x = e.x;
    var y = e.y;
    var canvas = this.refs.canvas.getDOMNode();
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    this.rects.push(this.genRect(x, y));
  },
  componentWillUpdate: function(nextProps, nextState) {},
  render: function() {
    return React.createElement("div", null, React.createElement("canvas", {
      ref: "canvas",
      width: 600,
      height: 400,
      style: {
        borderColor: 'gray',
        borderThickness: '1',
        borderStyle: 'solid'
      }
    }));
  }
});
exports.L2 = L2;


//# sourceURL=C:/Users/Mike/Projects/studies-octo-adventure/lp/c3_2/gm/src/lib/components/l2.js
},{"react":"react"}],5:[function(require,module,exports){
"use strict";
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
function compileShader(gl, type, src) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}
function prepareArrayBuffer(gl, size, vertices) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  buffer.itemSize = size;
  buffer.numItems = vertices.length / size;
  return buffer;
}
function prepareElementArrayBuffer(gl, size, vertices) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices), gl.STATIC_DRAW);
  buffer.itemSize = size;
  buffer.numItems = vertices.length / size;
  return buffer;
}
function prepareTexture(gl, src) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
  texture.image = new Image();
  texture.image.onload = function() {
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
function prepareColorTexture(gl, color) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(color));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}
function buildCorneredFigure(gl) {
  var zd = rand(0.1, 0.5);
  var centerZ = zd;
  var arrisZ = zd;
  var lowerZ = zd;
  var num = rand(1, 4) * 4;
  var x = randf(-1.0, 5.0);
  var y = randf(-1.0, 5.0);
  var size = randf(0.5, 1.5);
  var size2 = randf(size / 4, size * 0.7);
  var color = [rand(1, 255), rand(1, 255), rand(1, 255), rand(126, 255)];
  var vertices = [];
  var indices = [];
  for (var i = 0; i <= num; i++) {
    var ang = i * 2 * Math.PI / num;
    vertices.push(x, y, centerZ);
    vertices.push(x + size * Math.cos(ang), y + size * Math.sin(ang), arrisZ);
    var ang2 = ((i * 2) + 1) * Math.PI / num;
    vertices.push(x + size2 * Math.cos(ang2), y + size2 * Math.sin(ang2), lowerZ);
    vertices.push(x, y, centerZ);
    vertices.push(x + size2 * Math.cos(ang2), y + size2 * Math.sin(ang2), lowerZ);
    var ang3 = ((i * 2) + 2) * Math.PI / num;
    vertices.push(x + size * Math.cos(ang3), y + size * Math.sin(ang3), arrisZ);
  }
  var textureCoords = Array.from({length: (vertices.length / 3) * 2}, (function(v, k) {
    return 1.0;
  }));
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
  displayName: "L4",
  getInitialState: function() {
    return {
      angle: 45,
      rotation: 0
    };
  },
  initCanvas: function() {
    if (this.refs.canvas) {
      var canvas = this.refs.canvas.getDOMNode();
      var gl = this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      this.width = canvas.width;
      this.height = canvas.height;
      gl.viewport(0, 0, this.width, this.height);
      var mvMatrix = this.mvMatrix = mat4.create();
      var pMatrix = this.pMatrix = mat4.create();
      var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, "\n        precision mediump float;\n\n        varying vec2 vTextureCoord;\n\n        uniform sampler2D uSampler;\n\n        void main(void) {\n            gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n        }\n      ");
      var vertexShader = compileShader(gl, gl.VERTEX_SHADER, "\n        attribute vec3 aVertexPosition;\n        attribute vec2 aTextureCoord;\n\n        uniform mat4 uMVMatrix;\n        uniform mat4 uPMatrix;\n\n        varying vec2 vTextureCoord;\n\n\n        void main(void) {\n            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n            vTextureCoord = aTextureCoord;\n        }\n      ");
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
      this.figures = [{
        mode: gl.TRIANGLES,
        positions: prepareArrayBuffer(gl, 3, [3.0, 3.0, 0.0, 1.0, 3.0, 0.0, 3.0, 1.0, 0.0, 1.0, 1.0, 0.0]),
        textureCoords: prepareArrayBuffer(gl, 2, [1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0]),
        texture: prepareTexture(gl, 'assets/geom.png'),
        indices: prepareElementArrayBuffer(gl, 1, [0, 1, 2, 2, 3, 1])
      }, buildCorneredFigure(gl), buildCorneredFigure(gl), buildCorneredFigure(gl)];
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
    }
  },
  mvMatrixStack: [],
  _pushMvMatrix: function() {
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
  renderFigure: function(f) {
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
    if (f.indices) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, f.indices);
      gl.drawElements(f.mode, f.indices.numItems, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(f.mode, 0, f.positions.numItems);
    }
  },
  renderCanvas: function() {
    var gl = this.gl;
    var renderBuffer = this.renderBuffer;
    var shaderProgram = this.shaderProgram;
    gl.viewport(0, 0, this.width, this.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(this.pMatrix, 45.0, this.width / this.height, 0.1, 100.0);
    for (var $__0 = this.figures[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__1; !($__1 = $__0.next()).done; ) {
      var f = $__1.value;
      {
        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, -7.0]);
        mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, 0.001]);
        var rotation = this.state.rotation;
        mat4.rotate(this.mvMatrix, this.mvMatrix, rad(rotation), [1, 0, 0]);
        mat4.rotate(this.mvMatrix, this.mvMatrix, rad(rotation), [0, 1, 0]);
        mat4.rotate(this.mvMatrix, this.mvMatrix, rad(rotation), [0, 0, 1]);
        var num = 16;
        mat4.rotate(this.mvMatrix, this.mvMatrix, rad(this.state.angle), [0, 0, 1]);
        for (var i = 0; i < num; i++) {
          mat4.rotate(this.mvMatrix, this.mvMatrix, rad(360 / num), [0, 0, 1]);
          mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, 0.001]);
          this._pushMvMatrix();
          if (i % 2 === 0) {
            mat4.scale(this.mvMatrix, this.mvMatrix, [-1.0, 1.0, 1.0]);
          }
          this.renderFigure(f);
          this._popMvMatrix();
        }
      }
    }
  },
  queueRenderCanvas: function() {
    var self = this;
    requestAnimationFrame(function() {
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
    window.setTimeout(this.queueRenderCanvas, 500);
  },
  handleMouseClick: function(e) {
    var x = e.x;
    var y = e.y;
    var canvas = this.refs.canvas.getDOMNode();
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
  },
  componentWillUpdate: function(nextProps, nextState) {
    this.queueRenderCanvas();
  },
  render: function() {
    return React.createElement("div", {className: "container"}, React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-md-8"}, React.createElement("canvas", {
      ref: "canvas",
      width: 600,
      height: 400,
      style: {
        borderColor: 'gray',
        borderThickness: '1',
        borderStyle: 'solid'
      }
    })), React.createElement("div", {className: "col-md-4"}, React.createElement("form", null, React.createElement(Input, {
      name: "angle",
      type: "range",
      step: "any",
      min: "0",
      max: "90",
      label: "Кут",
      onChange: this._handleChange
    }), React.createElement(Input, {
      name: "rotation",
      type: "range",
      step: "any",
      min: "-90",
      max: "90",
      label: "Обертання",
      onChange: this._handleChange
    })))));
  },
  _handleChange: function(e) {
    var patch = {};
    patch[e.target.name] = e.target.value;
    this.setState(patch);
  }
});
exports.L4 = L4;


//# sourceURL=C:/Users/Mike/Projects/studies-octo-adventure/lp/c3_2/gm/src/lib/components/l4.js
},{"assert":7,"es6-shim":"es6-shim","gl-matrix":"gl-matrix","react":"react","react-bootstrap":"react-bootstrap"}],6:[function(require,module,exports){
"use strict";
var fix = function(p) {
  return {
    x: p.x - 0.5,
    y: p.y - 0.5
  };
};
var drawLines = function(ctx, points) {
  if (points.length > 1) {
    var start = fix(points[0]);
    ctx.moveTo(start.x, start.y);
    for (var i = 1; i < points.length; i++) {
      var next = fix(points[i]);
      ctx.lineTo(next.x, next.y);
    }
  }
};
module.exports.drawLines = drawLines;


//# sourceURL=C:/Users/Mike/Projects/studies-octo-adventure/lp/c3_2/gm/src/lib/draw-utils.js
},{}],7:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && !isFinite(value)) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) {
    return a === b;
  }
  var aIsArgs = isArguments(a),
      bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  var ka = objectKeys(a),
      kb = objectKeys(b),
      key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":11}],8:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],9:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],10:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],11:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":10,"_process":9,"inherits":8}]},{},[1]);
