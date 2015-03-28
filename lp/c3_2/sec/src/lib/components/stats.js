var React = require('react');
var StatsTable = require('./stats-table').StatsTable;
var StatsHist = require('./stats-hist').StatsHist;

var Stats = React.createClass({

  render: function() {
    return <div className="row">
      <div className="col-md-6">
        <StatsTable data={this.props.data} />
      </div>
      <div className="col-md-6">
        <StatsHist data={this.props.data} />
      </div>
    </div>;
  }

});

exports.Stats = Stats;
