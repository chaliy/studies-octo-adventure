global.document = window.document;
global.navigator = window.navigator;

'use strict';

require('traceur-runtime');

var gui = require('nw.gui');
var shell = require('nw.gui').Shell;
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Routes = require('./js/routes');

var App = React.createClass({
  render: function() {
    return <div className='container'>
        <RouteHandler />
      </div>;
  }
});

var router = Routes.create(App);

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
fileMenuItem.submenu = fileMenu;er
mainMenu.append(fileMenuItem);

var viewMenu = new gui.Menu();
transitionToMenuItem(viewMenu, 'Аналітика', 'analysis');
transitionToMenuItem(viewMenu, 'Шифр Цезаря', 'caesar');
transitionToMenuItem(viewMenu, 'Шифр Віженера', 'vigenere');

var viewMenuItem = new gui.MenuItem({ label: 'Вид' });
viewMenuItem.submenu = viewMenu;
mainMenu.append(viewMenuItem);

transitionToMenuItem(mainMenu, 'Про программу', 'about');

win.menu = mainMenu;
