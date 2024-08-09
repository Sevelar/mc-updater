import { BrowserWindow, dialog, ipcMain } from 'electron'
import { createWriteStream } from 'fs'
import { access, constants } from 'fs/promises'
import { join } from 'path'
import { Readable } from 'stream'
import { finished } from 'stream/promises'
import yauzl from 'yauzl'
import { t } from '../index.consts'
import { CustomError } from '../index.types'

export function createIPCHandlers(mainWindow: BrowserWindow): void {
  ipcMain.handle('get-mods-path', getModsPath)
  ipcMain.handle('choose-directory', () => chooseDirectory(mainWindow))
  // @ts-ignore not
  ipcMain.handle('update-modpack', updateModpack)
}

async function getModsPath(): Promise<string> {
  if (!process.env.APPDATA) throw new CustomError(t.error_no_appdata_env)

  const path = join(process.env.APPDATA, '.minecraft/mods')

  try {
    await access(path, constants.F_OK)
    return path
  } catch {
    throw new CustomError(t.error_file_not_exists(path))
  }
}

// @ts-ignore Shut up.
async function chooseDirectory(mainWindow: BrowserWindow): Promise<string | false> {
  try {
    const response = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] })
    if (response.canceled) return false

    if (!response.filePaths.length) throw new CustomError(t.error_choose_directory)
    else return response.filePaths[0]
  } catch (error) {
    if (error instanceof CustomError) throw error
    else {
      if (typeof error === 'string') throw new CustomError(t.error_unknown(error))
      else if (error instanceof Error) throw new CustomError(t.error_unknown(error.message))
    }
  }
}

async function updateModpack(path: string): Promise<void> {
  if (!path) throw new CustomError(t.error_no_mods_path)

  try {
    await access(path, constants.F_OK)
    const modpackFilePath = join(path, 'the-7th-modpack.zip')

    const response = await fetch('https://7st.io/static/modpack')
    if (response.status !== 200) throw new CustomError(t.error_response_not_ok)

    // if (!response.body) throw new CustomError(t.error_response_no_body)

    // const outputStream = createWriteStream(modpackFilePath)
    // // @ts-ignore Wrong typing
    // await finished(Readable.fromWeb(response.body).pipe(outputStream))

    // yauzl.open(modpackFilePath, (error, file) => {
    //   if (error) throw new CustomError(t.error_archive_error)

    //   file.readEntry()

    //   file.on("entry", (entry) => {
    //     if (/\/$/.test(entry.fileName)) return file.readEntry()

    //     file.openReadStream(entry, (error, readStream) => {
    //       if (error) throw new CustomError(t.error_archive_error)
    //       readStream.on("end", () => file.readEntry())
    //       readStream.pipe(path)
    //     })
    //   })
    // })
  } catch (error) {
    if (error instanceof CustomError) throw error
    else {
      if (typeof error === 'string') throw new CustomError(t.error_unknown(error))
      else if (error instanceof Error) throw new CustomError(t.error_unknown(error.message))
    }
  }
}
