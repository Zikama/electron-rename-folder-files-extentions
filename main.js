const electron = require('electron');

const { app, BrowserWindow, dialog, ipcMain, globalShortcut } = electron;


let mainWindow;
let addWindow;

makeSingleInstance();

// Listen for the app to be ready
app.on('ready', _ => {
    const url = require('url');
    const path = require('path');
    const fs = require('fs');

    let data;
    // Load files
    function loadFIles(ext) {
        let dir = 'C:/xampp/htdocs/alenzone/uploads/thumbnails/course_thumbnails/';
        return fs.readdirSync(dir, '').forEach(file => file.toString().endsWith('.jpg') ? data = file : data = file);

        fs.renameSync()
    }
    loadFIles();

    // Globally Quit Shortcut
    const quit = globalShortcut.register('CommandOrControl+Shift+Q', () => {
        app.quit();
    });
    if (!quit) console.log('Keyboard shortcut registration failed');

    // Create a new window
    mainWindow = new BrowserWindow({
        minHeight: 500,
        minWidth: 495,
        autoHideMenuBar: true,
        // frame: false,
        titleBarStyle: 'customButtonsOnHover',
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the html file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file:',
        slashes: true
    }));

    // Clean memory when closed
    mainWindow.on('close', () => {
        // Gabage Handler
        mainWindow = null;
        // Close the App
        app.quit();
    });

});

// On about to quit
app.on('will-quit', _ => {
    globalShortcut.unregisterAll()
})


// Listen to all window closed
app.on('window-all-closed', _ => {
    if (mainWindow !== undefined) {
        app.quit();
        return;
    }
    app.quit();
});

// handle Create Add Window
function createCreateAddWindow() {
    addWindow = new BrowserWindow({
        width: 500,
        height: 300,
        maxWidth: 500,
        maxHeight: 300,
        minHeight: 200,
        minWidth: 472,
        maximizable: false,
        title: 'Add an item',
        parent: mainWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true
    });

    // Load the html file for the app renderer
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, "addWindow.html"),
        protocol: 'file:',
        slashes: true
    }));

    // Gabage handler
    addWindow.on('closed', () => {
        addWindow = null;
    });
}

// Add dev tools item if not prod
if (process.env.NODE_ENV !== "production") {
    // mainMenuTemplate.push({
    //     label: 'Developer Tools',
    //     submenu :[
    //         {
    //             label: "Toggle devtools",
    //             accelerator: process.platform === 'darwin' ? 'Command+I': 'Ctrl+I',
    //             click(item, focusedWindow){
    //                 focusedWindow.toggleDevTools()

    //             }
    //         },
    //         {
    //             role: 'reload'
    //         }
    //     ]
    // })
}

// Opne dev tools
ipcMain.on('open:devTools', () => {
    mainWindow.toggleDevTools();
});


// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return;

    app.requestSingleInstanceLock();

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    })
}