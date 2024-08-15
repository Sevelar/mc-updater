import { BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'

export const notifyAppUpdateAvailable = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.send('app-update-available')
}

export const notifyAppUpdateDownloadProgress = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.send('app-update-download-progress')
}

export const notifyAppUpdateDownloaded = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.send('app-update-downloaded')
}

export const onAppUpdateDownload = () => {
  autoUpdater.downloadUpdate()
}

export const onAppUpdateInstall = () => {
  autoUpdater.quitAndInstall(true)
}
