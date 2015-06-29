var React = require('react');

var StatsTable = React.createClass({

  _sortAndFilter: function(data){
    data = data.slice(0);
    // data.sort(function(a,b){
    //   return a.name.localeCompare(b.name);
    // });
    data.sort(function(a,b){
      return b.val - a.val;
    });
    return data.slice(0, 15);
  },

  render: function() {
    return <table className="table table-hover table-striped">
    <caption>15 найчастіше повторюваних</caption>
    <thead>
      <tr>
        <th>Символ</th>
        <th>Кількість</th>
      </tr>
    </thead>
    <tbody>
    {this._sortAndFilter(this.props.data).map(function(row) {
      return (
        <tr key={row.name}>
          <td>{row.name}</td>
          <td>{row.val}</td>
        </tr>);
    })}
  </tbody></table>;
  }

});

exports.StatsTable = StatsTable;
