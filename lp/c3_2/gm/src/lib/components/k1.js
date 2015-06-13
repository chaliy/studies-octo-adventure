/* jshint esnext: true */
var React = require('react');
var assert = require('assert');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

var color = require('../models/color');

var K1 = React.createClass({

  getInitialState: function(){
    return {
      color: '#ff8c00'
    };
  },

  render: function() {

    var rgb = color.hexToRgb(this.state.color);
    var yiq = color.rgbToYiq(rgb);

    return <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <form>
            <Input name='color' type='text' label='Колір' onChange={this._handleChange} defaultValue={this.state.color} />
          </form>
        </div>
        <div className='col-md-4'>
            <h3>RGB</h3>
            <div>{rgb[0]}, {rgb[1]}, {rgb[2]}</div>
            <h3>YIQ</h3>
            <div>{yiq[0]}, {yiq[1]}, {yiq[2]}</div>
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

exports.K1 = K1;
