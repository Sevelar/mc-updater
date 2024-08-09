import { BrowserWindow } from 'electron'

export type CreateWindowReturn = {
  mainWindow: BrowserWindow
}

export interface RendererAPI {
  getModsPath: () => Promise<string>
  chooseDirectory: () => Promise<string | false>
  updateModpack: (modsPath: string, options?: UpdateModpackOptions) => Promise<boolean>
  onAppUpdateAvailable: (callback: () => void) => void
  onAppUpdateDownloadProgress: (callback: () => void) => void
  onAppUpdateDownloaded: (callback: () => void) => void
  downloadAppUpdate: () => void
  installAppUpdate: () => void
}

export class CustomError extends Error {}

export interface UpdateModpackOptions {
  enableBackup: boolean
}
