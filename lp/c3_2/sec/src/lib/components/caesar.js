var React = require('react');
var CaesarModel = require('../models/caesar-model');

var decodeText = function(text){
  return CaesarModel.decodeText(text, true, CaesarModel.ABC);
};

var encodeText = function(text){
  return CaesarModel.decodeText(text, false, CaesarModel.ABC);
};

var Caesar = React.createClass({

  getInitialState: function() {
    return {
      encodedText: this.props.text,
      decodedText: decodeText(this.props.text)
    };
  },

  render: function() {
    return <form>
      <div className='form-group'>
        <label htmlFor='inputText'>Шифрований текст</label>
        <textarea id='inputText'
          className='form-control'
          rows='10'
          value={this.state.encodedText}
          onChange={this._handleEncodedTextChange}></textarea>
      </div>
      <div className='form-group'>
        <label htmlFor='outputText'>Дешифрований текст</label>
        <textarea id='outputText'
          className='form-control'
          rows='10'
          value={this.state.decodedText}
          onChange={this._handleDecodedTextChange}></textarea>
      </div>
    </form>;
  },

  _handleEncodedTextChange: function(event) {
    this.setState({
      encodedText: event.target.value,
      decodedText: decodeText(event.target.value)
    })
  },

  _handleDecodedTextChange: function(event) {
    this.setState({
      encodedText: encodeText(event.target.value),
      decodedText: event.target.value
    })
  },

});

exports.Caesar = Caesar;
