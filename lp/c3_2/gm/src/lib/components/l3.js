/* jshint esnext: true */
var React = require('react');
var u = require('../u');
var cm = require('../coord-map');
var assign = Object.assign || require('object-assign');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

var L3 = React.createClass({

  getInitialState: function() {
    return {
      xv1: -1.5,
      xv2: 1.5,
      yv1: -1,
      yv2: 1,
      f1: '(x*x - 1)/(x*x*x*x + 1)',
      f2: '-(x*x*x*x*x) + 2*x*x*x - 1'
    };
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  getWorld: function(){
    return assign(cm.CoordSys(), {
      top: parseFloat(this.state.yv2),
      bottom: parseFloat(this.state.yv1),
      left: parseFloat(this.state.xv1),
      right: parseFloat(this.state.xv2)
    });
  },

  getScreen: function(){
    return assign(cm.CoordSys(), {
      top: 0,
      bottom: this.height,
      left: 0,
      right: this.width
    });
  },

  worldToScreen: function(x, y){
    var world = this.getWorld();
    var screen = this.getScreen();

    return cm.worldToScreen(x, y, world, screen);
  },

  /*
  * Генерація координатної сітки
  */
  coordNet: function(){

    var width = this.width;
    var height = this.height;

    var self = this;
    var world = this.getWorld();
    var screen = this.getScreen();

    var vertStep = (world.getWidth() / screen.getWidth()) * 50;
    var horisStep = (world.getHeight() / screen.getHeight()) * 50;

    var vert = [];
    for(let x = 0; x < world.right; x += vertStep){
      vert.push(x);
    }
    for(let x = 0; x > world.left; x -= vertStep){
      vert.push(x);
    }

    var horis = [];
    for(let y = 0; y < world.top; y += horisStep){
      horis.push(y);
    }
    for(let y = 0; y > world.bottom; y -= horisStep){
      horis.push(y);
    }

    var net = function*(){
      for(var x of vert){
        var vc = self.worldToScreen(x, 0);
        yield 'M ' + vc.x + ',' + screen.top;
        yield 'L ' + vc.x + ',' + screen.bottom;
      }
      for(var y of horis){
        var hc = self.worldToScreen(0, y);
        yield 'M ' + screen.left + ',' + hc.y;
        yield 'L ' + screen.right + ',' + hc.y;
      }
    };

    var labels = function*(){
      var i = 0;
      for(var x of vert){
        var vc = self.worldToScreen(x, 0).move(2, 20);
        var label = Math.round(x * 10) / 10;
        yield <text key={i++} x={vc.x} y={vc.y}>{label}</text>;
      }
      for(var y of horis){
        var hc = self.worldToScreen(0, y).move(-30, -2);
        var label = Math.round(y * 10) / 10;
        yield <text key={i++} x={hc.x} y={hc.y}>{label}</text>;
      }
    };

    var zero = this.worldToScreen(0, 0);    
    var axis = function*(){
      yield 'M ' + 0 + ',' + zero.y;
      yield 'L ' + width + ',' + zero.y;
      yield 'M ' + zero.x + ',' + 0;
      yield 'L ' + zero.x + ',' + height;
    };

    return <g>
      <path d={u.concate(net, ' ')} style={{stroke: 'gray'}} />
      <path d={u.concate(axis, ' ')} style={{stroke: 'black'}} />
      <g>{[...labels()]}</g>
      </g>
  },

  func: function(f, color){

    var self = this;
    var world = this.getWorld();
    var screen = this.getScreen();

    var xv1 = world.left;
    var xv2 = world.right;

    // Each pixel on screen
    var step = (world.getWidth() / screen.getWidth());
    console.log(step, world.left, world.right, world.getWidth(), screen.getWidth());

    var gr = function*(){
      var c = self.worldToScreen(xv1, f(xv1));
      yield 'M ' + c.x + ',' + c.y;
      yield 'L';
      for(var xv = xv1; xv <= xv2; xv += step){
        var c = self.worldToScreen(xv, f(xv));
        yield c.x + ',' + c.y;
      }
    };

    //console.log([...gr()]);

    return <path d={u.concate(gr, ' ')} style={{stroke: color, fill: 'none'}} />
  },

  render: function() {

    this.width = 600;
    this.height = 400;
    var self = this;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <svg width={this.width} height={this.height } >
              <rect width={this.width} height={this.height } style={{stroke: 'green', fill: 'none'}} />
              {this.coordNet()}
              {this.func(x => eval(self.state.f1), 'red')}
              {this.func(x => eval(self.state.f2), 'blue')}
            </svg>
          </div>
          <div className='col-md-4'>
            <form>
              <Input name='xv1' type='number' step='any' label='Від X' defaultValue={this.state.xv1} onChange={this._handleChange} />
              <Input name='xv2' type='number' step='any' label='До X' defaultValue={this.state.xv2} onChange={this._handleChange} />
              <Input name='yv1' type='number' step='any' label='Від Y' defaultValue={this.state.yv1} onChange={this._handleChange} />
              <Input name='yv2' type='number' step='any' label='До Y' defaultValue={this.state.yv2} onChange={this._handleChange} />
              <Input name='f1' type='text' label='Формула #1' defaultValue={this.state.f1} onChange={this._handleChange} />
              <Input name='f2' type='text' label='Формула #2' defaultValue={this.state.f2} onChange={this._handleChange} />
            </form>
          </div>
        </div>
      </div>
    );
  },

  _handleChange: function(e){
    var patch = {};
    patch[e.target.name] = e.target.value;
    this.setState(patch);
  }


});

exports.L3 = L3;
