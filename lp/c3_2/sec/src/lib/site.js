'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var es6 = require('es6-shim');

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
        <Navbar brand='SEC'>
          <Nav>
            <NavItemLink to="analysis" >Аналітика</NavItemLink>
            <NavItemLink to="caesar" >Шифр Цезаря</NavItemLink>
            <NavItemLink to="substitute" >Шифр Підстановка</NavItemLink>
            <NavItemLink to="vigenere" >Шифр Віженера</NavItemLink>
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

var router = Routes.create(App);
