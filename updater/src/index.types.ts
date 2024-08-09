import { BrowserWindow } from 'electron'

export type CreateWindowReturn = {
  mainWindow: BrowserWindow
}

export interface RendererAPI {
  getModsPath: () => Promise<string>
  chooseDirectory: () => Promise<string | false>
  updateModpack: (minecraftPath: string) => Promise<boolean>
}

export class CustomError extends Error {}
