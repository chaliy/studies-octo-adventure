var React = require('react');
var BarChart = require("react-chartjs").Bar;

var StatsHist = React.createClass({

  propTypes: {
    mode: React.PropTypes.oneOf(['Abc', 'Top']).isRequired
  },

  prepareData: function(data){

    data = data.slice(0);
    if (this.props.mode === 'Abc'){
      data.sort(function(a,b){
        return b.name > a.name;
      });
      data = data.slice(0, 30);
    } else {
      data.sort(function(a,b){
        return b.val - a.val;
      });
      data = data.slice(0, 15);
    }

    var abc = data.map(function (x) {
      return x.name;
    });

    var vals = data.map(function (x) {
      return x.val;
    });

    return {
        labels: abc,
        datasets: [
            {
                label: "Char",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: vals
            }
        ]
    };
  },

  render: function() {
    return <BarChart data={this.prepareData(this.props.data)} redraw style={{width: '100%'}}/>;
  }

});

exports.StatsHist = StatsHist;
