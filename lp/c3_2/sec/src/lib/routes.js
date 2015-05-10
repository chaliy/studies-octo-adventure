var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Analysis = require("./components/analysis").Analysis;
var Caesar = require("./components/caesar").Caesar;
var Vigenere = require("./components/vigenere").Vigenere;
var About = require("./components/about").About;

module.exports.create = function(App){
  var routes = (
    <Route handler={App} path="/">
      <Route name="analysis" path="analysis" handler={Analysis} />
      <Route name="caesar" path="caesar" handler={Caesar} />
      <Route name="vigenere" path="vigenere" handler={Vigenere} />
      <Route name="about" path="about" handler={About} />
    </Route>
  );

  return Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}
