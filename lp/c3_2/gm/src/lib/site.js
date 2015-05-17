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

var Routes = require('./routes');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <Navbar brand='DM'>
          <Nav>
            {Routes.routes.map(function(r){
              return <NavItemLink key={r.name} to={r.name} >{r.title}</NavItemLink>
            })}
          </Nav>
        </Navbar>
        <div className='container'>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

var router = Routes.create(App);
