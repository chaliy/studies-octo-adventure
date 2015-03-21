global.document = window.document;
global.navigator = window.navigator;

var gui = require('nw.gui');
var shell = require('nw.gui').Shell;
var React = require('react');
//var Analysis = require("./analysis"); WTF???

var win = gui.Window.get();
var main = document.getElementById('main');

var mainMenu = new gui.Menu({ type: 'menubar' });

mainMenu.append(new gui.MenuItem({ label: 'File' }));

var viewMenu = new gui.Menu();
viewMenu.append(new gui.MenuItem({ label: 'Analysis', click: function(){
  React.render(<Analysis />, main);
}}));

var viewMenuItem = new gui.MenuItem({ label: 'View' });
viewMenuItem.submenu = viewMenu;

mainMenu.append(viewMenuItem);
mainMenu.append(new gui.MenuItem({ label: 'Help' }));

win.menu = mainMenu;
