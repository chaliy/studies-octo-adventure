'use strict';

var React = require('react');
var es6 = require('es6-shim');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;

var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;

var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;
var ButtonLink = ReactRouterBootstrap.ButtonLink;


var About = require('./components/about').About;
var L1 = require('./components/l1').L1;
var L2 = require('./components/l2').L2;
var L4 = require('./components/l4').L4;


var App = React.createClass({

  render: function() {
    return (
      <div>
        <Navbar brand='DM'>
          <Nav>
            <NavItemLink to="l1" >L1</NavItemLink>
            <NavItemLink to="l2" >L2</NavItemLink>
            <NavItemLink to="l4" >L4</NavItemLink>
            <NavItemLink to="about">Про программу...</NavItemLink>
          </Nav>
        </Navbar>
        <div className='container'>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <Route name="l1" path="l1" handler={L1} />
    <Route name="l2" path="l2" handler={L2} />
    <Route name="l4" path="l4" handler={L4} />
    <Route name="about" path="about" handler={About} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
