import { t } from '@shared/index.consts'
import { CustomError, UpdateModpackOptions } from '@shared/index.types'
import { randomUUID } from 'crypto'
import { BrowserWindow, dialog } from 'electron'
import { createWriteStream } from 'fs'
import { access, constants, lstat, mkdir, readdir, rename, rm, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import { Readable } from 'stream'
import { finished, pipeline } from 'stream/promises'
import yauzl from 'yauzl-promise'

export const getModsPath = async () => {
  if (!process.env.APPDATA) throw t.error_no_appdata_env

  const path = join(process.env.APPDATA, '.minecraft/mods')

  try {
    await access(path, constants.F_OK)
    return path
  } catch {
    throw t.error_file_not_exists(path)
  }
}

export const chooseDirectory = async (mainWindow: BrowserWindow) => {
  try {
    const response = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] })
    if (response.canceled) return false

    if (!response.filePaths.length) throw new CustomError(t.error_choose_directory)
    else return response.filePaths[0]
  } catch (error) {
    if (error instanceof CustomError) throw error.message
    else {
      if (typeof error === 'string') throw t.error_unknown(error)
      else if (error instanceof Error) throw t.error_unknown(error.message)
    }
    throw t.error_unknown('???')
  }
}

export const updateModpack = async (modsPath: string, options?: UpdateModpackOptions) => {
  if (!modsPath) throw t.error_no_mods_path

  const tempFolderPath = join(tmpdir(), `updater-${randomUUID()}`)
  const modpackFilePath = join(tempFolderPath, 'the-7th-guild-modpack.zip')
  const backupFolderPath = resolve(modsPath, `../mods-${Date.now()}`)

  try {
    // Create mods folder, if for some reason it doesn't exist
    try {
      await access(modsPath, constants.F_OK)
    } catch {
      await mkdir(modsPath)
    }

    if (options?.enableBackup) {
      const modsFolder = await readdir(modsPath)
      if (modsFolder.length) {
        // Rename mods to mods-<timestamp>
        await rename(modsPath, backupFolderPath)
        await mkdir(modsPath)
      }
    } else {
      // Delete all files in mods folder
      const modsFolder = await readdir(modsPath)
      if (modsFolder.length) {
        for (const file of modsFolder) {
          const isDirectory = (await lstat(join(modsPath, file))).isDirectory()

          if (isDirectory) await rm(join(modsPath, file), { recursive: true, force: true })
          else await unlink(join(modsPath, file))
        }
      }
    }

    const response = await fetch('https://7st.io/static/modpack')
    if (response.status !== 200) throw new CustomError(t.error_response_not_ok)

    if (!response.body) throw new CustomError(t.error_response_no_body)

    await mkdir(tempFolderPath)

    const outputStream = createWriteStream(modpackFilePath)
    // @ts-ignore Wrong typing
    await finished(Readable.fromWeb(response.body).pipe(outputStream))
    outputStream.close()

    const archive = await yauzl.open(modpackFilePath)
    for await (const entry of archive) {
      if (entry.filename.endsWith('/')) {
        await mkdir(join(modsPath, entry.filename), { recursive: true })
      } else {
        const readStream = await entry.openReadStream()
        const writeStream = createWriteStream(join(modsPath, entry.filename))
        await pipeline(readStream, writeStream)
      }
    }
    await archive.close()
  } catch (error) {
    try {
      if (options?.enableBackup) {
        await access(modsPath, constants.F_OK)
        await access(backupFolderPath, constants.F_OK)

        // Recover backup
        await rm(modsPath, { recursive: true, force: true })
        await rename(backupFolderPath, modsPath)
      }
    } catch (error) {
      if (error instanceof CustomError) throw error.message
      else {
        if (typeof error === 'string') throw t.error_unknown(error)
        else if (error instanceof Error) throw t.error_unknown(error.message)
      }
    }

    if (error instanceof CustomError) throw error.message
    else {
      if (typeof error === 'string') throw t.error_unknown(error)
      else if (error instanceof Error) throw t.error_unknown(error.message)
    }
  } finally {
    await access(tempFolderPath, constants.F_OK)
    await rm(tempFolderPath, { recursive: true, force: true })
  }
}
