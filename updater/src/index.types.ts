import { BrowserWindow } from 'electron'

export type CreateWindowReturn = {
  mainWindow: BrowserWindow
}

export interface RendererAPI {
  getModsPath: () => Promise<string>
  chooseDirectory: () => Promise<string | false>
  updateModpack: (modsPath: string, options?: UpdateModpackOptions) => Promise<boolean>
}

export class CustomError extends Error {}

export interface UpdateModpackOptions {
  enableBackup: boolean
}
