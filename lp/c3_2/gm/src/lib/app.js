
global.document = window.document;
global.navigator = window.navigator;
global.CanvasRenderingContext2D = window.CanvasRenderingContext2D;
global.requestAnimationFrame = window.requestAnimationFrame;

'use strict';

var gui = require('nw.gui');
var shell = require('nw.gui').Shell;
var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var About = require('./js/components/about').About;
var L1 = require('./js/components/l1').L1;


var App = React.createClass({
  render: function() {
    return <div className='container'>
        <RouteHandler />
      </div>;
  }
});

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={About}/>
    <Route name='l1' path='l1' handler={L1} />
    <Route name='about' path='about' handler={About} />
  </Route>
);

var router = Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});


// Define Menu
var win = gui.Window.get();

var mainMenu = new gui.Menu({ type: 'menubar' });

var fileMenu = new gui.Menu();
fileMenu.append(new gui.MenuItem({ label: 'Вихід', click: function(){
  gui.App.quit();
}}));
var fileMenuItem = new gui.MenuItem({ label: 'Файл' });
fileMenuItem.submenu = fileMenu;
mainMenu.append(fileMenuItem);

var viewMenu = new gui.Menu();
viewMenu.append(new gui.MenuItem({ label: 'Лабораторна #1', click: function(){
  router.transitionTo('l1');
}}));

var viewMenuItem = new gui.MenuItem({ label: 'Вид' });
viewMenuItem.submenu = viewMenu;
mainMenu.append(viewMenuItem);

mainMenu.append(new gui.MenuItem({ label: 'Про программу', click: function(){
  router.transitionTo('about');
}}));

win.menu = mainMenu;
