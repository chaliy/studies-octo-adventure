var React = require('react');

var About = React.createClass({

  render: function() {
    return <div className="jumbotron">
        <h1>Михайло Чалий</h1>
        <p>Студент гр. НКз-31</p>
        <p><a href="mailto:mike@chaliy.name">mike@chaliy.name</a></p>
      </div>;
  }
});

exports.About = About;
