var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
require('es6-shim');

var SubstituteModel = require('../models/substitute-model');

var decodeText = function(text, abc, key){
  return SubstituteModel.decodeText(text, abc || '', key || '');
};

var Substitute = React.createClass({

  getInitialState: function() {
    return {
      abcText: SubstituteModel.ABC,
      keyText: SubstituteModel.CAESAR_CODE,
      encodedText: this.props.text,
      decodedText: decodeText(this.props.text, SubstituteModel.ABC, SubstituteModel.CAESAR_CODE)
    };
  },

  render: function() {
    var abcText = this.state.abcText;
    var keyText = this.state.keyText;

    var abcInput = Array.from(abcText).map(function(x, i){
      return <input key={i} type='text' defaultValue={x} style={{width:'25px'}} />
    });
    abcInput.push(<input key='n' type='text' style={{width:'25px'}} />);

    var keyInput = Array.from(abcText).map(function(x, i){
      var k = keyText[i];
      return <input key={i} type='text' defaultValue={k} style={{width:'25px'}} />
    });
    keyInput.push(<input key='n' type='text' style={{width:'25px'}} />);

    return <form>
      <Input name='abcText' type='text' label='Абетка' placeholder='Введіть абетку' defaultValue={this.state.abcText} onChange={this._handleAbcTextChange} />
      <Input name='keyText' type='text' label='Ключ' placeholder='Введіть ключ' defaultValue={this.state.keyText} onChange={this._handleKeyTextChange} />
      <div>
        {abcInput}
      </div>
      <div>
        {keyInput}
      </div>
      <Input name='inputText' type='textarea' rows='10'
        label='Шифрований текст'
        placeholder='Введіть шифрований текст'
        defaultValue={this.state.encodedText}
        onChange={this._handleEncodedTextChange} />
      <Input name='inputText' type='textarea' rows='10'
        label='Дешифрований текст'
        readOnly={true}
        placeholder='Дешифрований текст'
        value={this.state.decodedText} />
    </form>;
  },

  _handleEncodedTextChange: function(event) {
    this.setState({
      encodedText: event.target.value,
      decodedText: decodeText(event.target.value, this.state.abcText, this.state.keyText)
    });
  },

  _handleKeyTextChange: function(event) {
    this.setState({
      keyText: event.target.value,
      decodedText: decodeText(this.state.encodedText, this.state.abcText, event.target.value)
    });
  },

  _handleAbcTextChange: function(event) {
    this.setState({
      abcText: event.target.value,
      decodedText: decodeText(this.state.encodedText, event.target.value, this.state.keyText)
    });
  },

});

exports.Substitute = Substitute;
