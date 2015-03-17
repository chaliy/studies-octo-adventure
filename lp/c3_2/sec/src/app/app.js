// var gui = require('nw.gui');
// var shell = require('nw.gui').Shell;
//
// var win = gui.Window.get();
//
//
// var mainMenu = new gui.Menu({ type: 'menubar' });
//
// mainMenu.append(new gui.MenuItem({ label: 'File' }));
// mainMenu.append(new gui.MenuItem({ label: 'View' }));
// mainMenu.append(new gui.MenuItem({ label: 'Help' }));
//
// win.menu = mainMenu;

WinJS.Namespace.define("Sample", {
    splitView: null,
    togglePane: WinJS.UI.eventHandler(function (ev) {
        if (Sample.splitView) {
            Sample.splitView.paneHidden = !Sample.splitView.paneHidden;
        }
    })
});

WinJS.Binding.processAll(null, Sample).then(function () {
    WinJS.UI.processAll().done(function () {
        Sample.splitView = document.querySelector(".splitView").winControl;
        new WinJS.UI._WinKeyboard(Sample.splitView.paneElement);
        // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
    });
})
