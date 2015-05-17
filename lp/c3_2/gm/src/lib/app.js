
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

console.log('test');

var Routes = require('./js/routes');

var App = React.createClass({
  render: function() {
    return <div className='container'>
        <RouteHandler />
      </div>;
  }
});

var router = Routes.create(App);

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

Routes.routes.forEach(function(r){
  if (r.name !== 'about'){
    transitionToMenuItem(viewMenu, r.title, r.name);
  }
});

var viewMenuItem = new gui.MenuItem({ label: 'Вид' });
viewMenuItem.submenu = viewMenu;
mainMenu.append(viewMenuItem);

transitionToMenuItem(mainMenu, 'Про программу', 'about');

win.menu = mainMenu;
