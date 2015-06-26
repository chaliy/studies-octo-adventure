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
var Employees = require('./components/employee/employees').Employees;
var Courses = require('./components/course/courses').Courses;

require('./stores/employees-store').EmployeesStore.init();
require('./stores/courses-store').CoursesStore.init();

var App = React.createClass({

  render: function() {
    return (
      <div>
        <Navbar brand='Студія Візажу'>
          <Nav>
            <NavItemLink to="employees" >Співробітники</NavItemLink>
            <NavItemLink to="courses" >Курси</NavItemLink>
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
    <Route name="employees" path="employees" handler={Employees} />
    <Route name="courses" path="courses" handler={Courses} />
    <Route name="about" path="about" handler={About} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
