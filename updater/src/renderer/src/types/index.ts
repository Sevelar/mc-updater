import { MessageInstance } from 'antd/es/message/interface'
import { ReactNode } from 'react'

export const menuItemKeys = ['easy-update', 'detailed-update', 'restore-backup'] as const
export type MenuItemKey = (typeof menuItemKeys)[number]

export const launcherKeys = ['vanilla-launcher', 'custom-launcher'] as const
export type LauncherKey = (typeof launcherKeys)[number]

export interface GlobalStore {
  isBackupEnabled: boolean
  isModpackUpdating: boolean
  selectedMenuItem: MenuItemKey
  selectedLauncher: LauncherKey
  modsPath: string
  messageApi: MessageInstance | null
}

export type MenuComponents = {
  [key in MenuItemKey]: ReactNode
}

export interface Launcher {
  value: LauncherKey
  label: string
}
