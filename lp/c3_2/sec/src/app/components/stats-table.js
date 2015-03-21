var React = require('react');

var StatsTable = React.createClass({

  getInitialState: function() {
    return this.props;
    // return {
    //   data: [{name: 't', val: 2},
    //          {name: 's', val: 1}]
    // }
  },

  render: function() {
    return <table className="table table-hover table-striped">
    <thead>
      <tr>
        <th>Символ</th>
        <th>Кількість</th>
      </tr>
    </thead>
    <tbody>
    {this.state.data.map(function(row) {
      return (
        <tr>
          <td>{row.name}</td>
          <td>{row.val}</td>
        </tr>);
    })}
  </tbody></table>;
  }

});
