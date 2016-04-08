(function() {

	// Module automatically included (only) in the Renderer process (Electron)
	//noinspection NodeRequireContents
	var remote = require('remote');
	var Menu = remote.require('menu');

	var template = [{
		label: 'App',
		submenu: [{
			label: 'Exit',
			accelerator: 'CmdOrCtrl+Q',
			role: 'close'
		}]
	}, {
		label: 'Dev',
		submenu: [{
			label: 'Reload',
			accelerator: 'F5',
			click: function(item, focusedWindow) {
				if (focusedWindow)
					focusedWindow.reload();
			}
		}, {
			label: 'Toggle Full Screen',
			accelerator: (function() {
				if (process.platform == 'darwin')
					return 'Ctrl+Command+F';
				else
					return 'F11';
			})(),
			click: function(item, focusedWindow) {
				if (focusedWindow)
					focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
			}
		}, {
			label: 'Toggle Developer Tools',
			accelerator: (function() {
				if (process.platform == 'darwin')
					return 'Alt+Command+I';
				else
					return 'F12';
			})(),
			click: function(item, focusedWindow) {
				if (focusedWindow)
					focusedWindow.toggleDevTools();
			}
		}]
	}];


	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

})();
