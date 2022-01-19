const { app, BrowserWindow, globalShortcut} = require('electron')
const config = require('./config')

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 500,
        // titleBarStyle: 'hidden',
        alwaysOnTop: true,
    })
    win.loadURL(config.url)
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () =>{
        if (BrowserWindow.getAllWindows.length === 0)
            createWindow()
    })
}).then(createShortCurts)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

function toggleDevTools(){
    win.webContents.toggleDevTools()
}

function createShortCurts(){
    globalShortcut.register('F1', toggleDevTools)
}