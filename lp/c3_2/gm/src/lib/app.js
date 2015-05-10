
global.document = window.document;
global.navigator = window.navigator;
global.CanvasRenderingContext2D = window.CanvasRenderingContext2D;
global.Path2D = window.Path2D;
global.requestAnimationFrame = window.requestAnimationFrame;
global.setInterval = window.setInterval;
global.clearInterval = window.clearInterval;
global.Image = window.Image;

'use strict';

require('traceur-runtime');

var gui = require('nw.gui');
var shell = require('nw.gui').Shell;
var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var About = require('./js/components/about').About;
var L1 = require('./js/components/l1').L1;
var L2 = require('./js/components/l2').L2;
var L4 = require('./js/components/l4').L4;


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
    <Route name='l2' path='l2' handler={L2} />
    <Route name='l4' path='l4' handler={L4} />
    <Route name='about' path='about' handler={About} />
  </Route>
);

var router = Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});


// Define Menu
var transitionToMenuItem = function(menu, label, path){
  menu.append(new gui.MenuItem({ label: label, click: function(){
    router.transitionTo(path);
  }}));
}

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
transitionToMenuItem(viewMenu, 'Лабораторна #1', 'l1');
transitionToMenuItem(viewMenu, 'Лабораторна #2', 'l2');
transitionToMenuItem(viewMenu, 'Лабораторна #4', 'l4');

var viewMenuItem = new gui.MenuItem({ label: 'Вид' });
viewMenuItem.submenu = viewMenu;
mainMenu.append(viewMenuItem);

transitionToMenuItem(mainMenu, 'Про программу', 'about');

win.menu = mainMenu;
