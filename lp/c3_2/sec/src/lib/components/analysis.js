var React = require('react');
var AnalysisModel = require('../models/analysis-model').AnalysisModel;
var Stats = require('./stats').Stats;

var Analysis = React.createClass({

  getInitialState: function() {
    return AnalysisModel.getState();
  },

  reloadState: function(){
    this.setState(AnalysisModel.getState());
  },

  componentDidMount: function() {
    AnalysisModel.addChangeListener(this.reloadState);
  },

  componentWillUnmount: function() {
    AnalysisModel.removeChangeListener(this.reloadState);
  },

  render: function() {
    return <form>
      <div className='form-group'>
        <label htmlFor='inputText'>Текст</label>
        <textarea id='inputText'
          className='form-control'
          rows='10'
          value={this.state.text}
          onChange={this._handleTextChange}></textarea>
      </div>
      <Stats data={this.state.onegram} />
      <Stats data={this.state.bigram} />
      <Stats data={this.state.trigram} />
      <Stats data={this.state.fourgram} />
    </form>;
  },

  _handleTextChange: function(event) {
    AnalysisModel.pushTextChanges(event.target.value);
  }

});

exports.Analysis = Analysis;
