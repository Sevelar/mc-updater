import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { RendererAPI, UpdateModpackOptions } from '../index.types'

// Custom APIs for renderer
const api: RendererAPI = {
  // index.main.ts
  getModsPath: () => {
    return ipcRenderer.invoke('get-mods-path')
  },
  chooseDirectory: () => {
    return ipcRenderer.invoke('choose-directory')
  },
  updateModpack: (modsPath: string, options?: UpdateModpackOptions) => {
    return ipcRenderer.invoke('update-modpack', modsPath, options)
  },

  // index.updater.ts
  onAppUpdateAvailable: (callback) => {
    return ipcRenderer.on('app-update-available', () => callback())
  },
  onAppUpdateDownloadProgress: (callback) => {
    return ipcRenderer.on('app-update-download-progress', () => callback())
  },
  onAppUpdateDownloaded: (callback) => {
    return ipcRenderer.on('app-update-downloaded', () => callback())
  },
  downloadAppUpdate: () => {
    return ipcRenderer.send('on-app-update-download')
  },
  installAppUpdate: () => {
    return ipcRenderer.send('on-app-update-install')
  }
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
