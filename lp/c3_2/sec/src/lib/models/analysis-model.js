var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

function calculateStats(t){
  var onegram = {};
  var bigram = {};
  var trigram = {};
  var fourgram = {};
  for(var i = 0; i < t.length; i++){
    var char = t.charAt(i);
    onegram[char] = (onegram[char] || 0) + 1;
    if (i < t.length - 1){
      var char2 = char + t.charAt(i+1);
      bigram[char2] = (bigram[char2] || 0) + 1;

      if (i < t.length - 2){
        var char3 = char2 + t.charAt(i+2);
        trigram[char3] = (trigram[char3] || 0) + 1;

        if (i < t.length - 3){
          var char4 = char3 + t.charAt(i+3);
          fourgram[char4] = (fourgram[char4] || 0) + 1;
        }
      }
    }
  }

  var rows = function(hash){
    return Object.keys(hash).map(function (key) {
      return { name: key, val: hash[key] };
    });
  }

  return {
    onegram: rows(onegram),
    bigram: rows(bigram),
    trigram: rows(trigram),
    fourgram: rows(fourgram)
  }
}


var _text = 'YGBPGGFBOQTGBUPQYBHQTBDGVVGTBUMKKPI';

var AnalysisModel = assign({}, EventEmitter.prototype, {

  pushTextChanges: function(t){
    _text = t;
    this.emitChange();
  },

  getState: function(){
    return assign({
      text: _text
    }, calculateStats(_text));
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

if (typeof exports == 'undefined') {
  exports = {};
}

exports.calculateStats = calculateStats;
exports.AnalysisModel = AnalysisModel;
