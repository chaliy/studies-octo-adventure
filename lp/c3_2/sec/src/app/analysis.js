var React = require('react');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

//var StatsTable = require('./components/stats-table');

var CHANGE_EVENT = 'change';
var _text = "12";

function calculateStats(t){
  var singles = {};
  for(var i = 0; i < t.length; i++){
    var char = t.charAt(i);
    singles[char] = (singles[char] || 0) + 1;
  }

  return {
    singles:  Object.keys(singles).map(function (key) {
      return { name: key, val: singles[key] };
    })
  }
}

var AnalysisModel = assign({}, EventEmitter.prototype, {

  pushTextChanges: function(t){
    _text = t;
    this.emitChange();
  },

  getText: function(){
    return _text;
  },

  getState: function(){
    return {
      text: _text,
      stats: calculateStats(_text)
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

var Analysis = React.createClass({

  getInitialState: function() {
    return AnalysisModel.getState();
  },

  componentDidMount: function() {
    AnalysisModel.addChangeListener(this._onModelChange);
  },

  componentWillUnmount: function() {
    AnalysisModel.removeChangeListener(this._onModelChange);
  },

  _handleTextChange: function(event) {
    this.setState({
      value: event.target.value
    });
    AnalysisModel.pushTextChanges(event.target.value);
  },
  render: function() {
    return <form>
      <div className="form-group">
        <label htmlFor="inputText">Текст</label>
        <textarea id="inputText"
          className="form-control"
          rows="10"
          value={this.state.text}
          onChange={this._handleTextChange}></textarea>
      </div>
      <StatsTable data={this.state.stats.singles} />
    </form>;
  },

  _onModelChange: function() {
     this.setState(AnalysisModel.getState());
  }

});

if (typeof exports != 'undefined') {
  exports.calculateStats = calculateStats;
}
