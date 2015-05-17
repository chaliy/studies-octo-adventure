var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

var VigenereModel = require('../models/vigenere-model');

var decodeText = function(text, key){
  return VigenereModel.decodeText(text, key, true, VigenereModel.ABC);
};

var encodeText = function(text, key){
  return VigenereModel.decodeText(text, key, false, VigenereModel.ABC);
};

var Vigenere = React.createClass({

  getInitialState: function() {
    return {
      keyText: 'CHALYIMYKHAILO',
      encodedText: this.props.text,
      decodedText: decodeText(this.props.text)
    };
  },

  render: function() {
    return <form>
      <Input name='keyText' type='text' label='Ключ' placeholder='Введіть Ключ' defaultValue={this.state.keyText} onChange={this._handleKeyTextChange} />
      <div className='form-group'>
        <label htmlFor='encodedText'>Шифрований текст</label>
        <textarea id='encodedText'
          className='form-control'
          rows='10'
          value={this.state.encodedText}
          onChange={this._handleEncodedTextChange}></textarea>
      </div>
      <div className='form-group'>
        <label htmlFor='decodedText'>Дешифрований текст</label>
        <textarea id='decodedText'
          className='form-control'
          rows='10'
          value={this.state.decodedText}
          onChange={this._handleDecodedTextChange}></textarea>
      </div>
    </form>;
  },

  _handleKeyTextChange: function(event) {
    this.setState({
      keyText: event.target.value
    })
  },

  _handleEncodedTextChange: function(event) {
    //console.log(React.findDOMNode(this.refs.keyText).value);
    this.setState({
      encodedText: event.target.value,
      decodedText: decodeText(event.target.value, this.state.keyText)
    })
  },

  _handleDecodedTextChange: function(event) {
    //console.log(this.refs.keyText.value);
    this.setState({
      encodedText: encodeText(event.target.value, this.state.keyText),
      decodedText: event.target.value
    })
  },

});

exports.Vigenere = Vigenere;
