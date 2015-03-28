global.document = window.document;
global.navigator = window.navigator;

"use strict";

var gui = require('nw.gui');
var shell = require('nw.gui').Shell;
var React = require('react');
var Analysis = require("./js/components/analysis").Analysis;
var Caesar = require("./js/components/caesar").Caesar;
var Vigenere = require("./js/components/vigenere").Vigenere;
var About = require("./js/components/about").About;


var win = gui.Window.get();

var mainMenu = new gui.Menu({ type: 'menubar' });
var getMain = function(){
  return document.getElementById('main');
}

var fileMenu = new gui.Menu();
fileMenu.append(new gui.MenuItem({ label: 'Вихід', click: function(){
  gui.App.quit();
}}));
var fileMenuItem = new gui.MenuItem({ label: 'Файл' });
fileMenuItem.submenu = fileMenu;
mainMenu.append(fileMenuItem);

var viewMenu = new gui.Menu();
viewMenu.append(new gui.MenuItem({ label: 'Аналітика', click: function(){
  React.render(<Analysis />, getMain());
}}));
viewMenu.append(new gui.MenuItem({ label: 'Шифр Цезаря', click: function(){
  React.render(<Caesar />, getMain());
}}));
viewMenu.append(new gui.MenuItem({ label: 'Шифр Віженера', click: function(){
  React.render(<Vigenere />, getMain());
}}));

var viewMenuItem = new gui.MenuItem({ label: 'Вид' });
viewMenuItem.submenu = viewMenu;
mainMenu.append(viewMenuItem);

mainMenu.append(new gui.MenuItem({ label: 'Про программу', click: function(){
  React.render(<About />, getMain());
}}));

win.menu = mainMenu;
