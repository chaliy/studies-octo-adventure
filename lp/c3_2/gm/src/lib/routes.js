var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var About = require('./components/about').About;
var L1 = require('./components/l1').L1;
var L2 = require('./components/l2').L2;
var L3 = require('./components/l3').L3;
var L4 = require('./components/l4').L4;

module.exports.routes = [
  {title: 'Лабораторна #1', name: 'l1', path: 'l1', handler: L1 },
  {title: 'Лабораторна #2', name: 'l2', path: 'l2', handler: L2 },
  {title: 'Лабораторна #3', name: 'l3', path: 'l3', handler: L3 },
  {title: 'Лабораторна #4', name: 'l4', path: 'l4', handler: L4 },
  {title: 'Про программу...', name: 'about', path: 'about', handler: About },
];

module.exports.create = function(App){

  var routes = (
    <Route handler={App} path="/">
      {module.exports.routes.map(function(r){
        return <Route key={r.name} {... r} />
      })}
    </Route>
  );

  return Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}
