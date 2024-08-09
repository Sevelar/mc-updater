import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { RendererAPI, UpdateModpackOptions } from '../index.types'

// Custom APIs for renderer
const api: RendererAPI = {
  getModsPath: () => ipcRenderer.invoke('get-mods-path'),
  chooseDirectory: () => ipcRenderer.invoke('choose-directory'),
  updateModpack: (modsPath: string, options?: UpdateModpackOptions) =>
    ipcRenderer.invoke('update-modpack', modsPath, options),
  onAppUpdateAvailable: (callback: () => void) =>
    ipcRenderer.on('app-update-available', () => callback()),
  onAppUpdateDownloadProgress: (callback: () => void) =>
    ipcRenderer.on('app-update-download-progress', () => callback()),
  onAppUpdateDownloaded: (callback: () => void) =>
    ipcRenderer.on('app-update-downloaded', () => callback()),
  downloadAppUpdate: () => ipcRenderer.send('on-app-update-download'),
  installAppUpdate: () => ipcRenderer.send('on-app-update-install')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
