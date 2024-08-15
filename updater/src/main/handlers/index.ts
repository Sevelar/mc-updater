import { UpdateModpackOptions } from '@shared/index.types'
import { BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { chooseDirectory, getModsPath, updateModpack } from './index.main'
import {
  notifyAppUpdateAvailable,
  notifyAppUpdateDownloadProgress,
  notifyAppUpdateDownloaded,
  onAppUpdateDownload,
  onAppUpdateInstall
} from './index.updater'

export const createIPCHandlers = (mainWindow: BrowserWindow) => {
  // index.main.ts
  ipcMain.handle('get-mods-path', getModsPath)
  ipcMain.handle('choose-directory', () => chooseDirectory(mainWindow))
  ipcMain.handle('update-modpack', (_event, path: string, options?: UpdateModpackOptions) =>
    updateModpack(path, options)
  )

  // index.updater.ts
  autoUpdater.on('update-available', () => notifyAppUpdateAvailable(mainWindow))
  autoUpdater.on('download-progress', () => notifyAppUpdateDownloadProgress(mainWindow))
  autoUpdater.on('update-downloaded', () => notifyAppUpdateDownloaded(mainWindow))
  ipcMain.on('on-app-update-download', onAppUpdateDownload)
  ipcMain.on('on-app-update-install', onAppUpdateInstall)
}
