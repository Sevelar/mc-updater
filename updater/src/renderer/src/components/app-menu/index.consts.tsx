import { SettingTwoTone, ThunderboltTwoTone, ToolTwoTone } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { ReactNode } from 'react'
import { EasyUpdate } from '../easy-update'

type MenuItem = Required<MenuProps>['items'][number]
export const menuItems: MenuItem[] = [
  {
    type: 'group',
    label: 'Modpack Updater',
    children: [
      {
        key: 'easy-update',
        label: 'Easy Update',
        icon: <ThunderboltTwoTone twoToneColor="red" />
      },
      {
        key: 'detailed-update',
        label: 'Detailed Update',
        icon: <SettingTwoTone twoToneColor="red" />
      },
      {
        key: 'restore-backup',
        label: 'Restore Backup',
        icon: <ToolTwoTone twoToneColor="red" />
      }
    ]
  }
]

interface MenuComponents {
  [key: string]: ReactNode
}
export const menuComponents: MenuComponents = {
  'easy-update': <EasyUpdate />,
  'detailed-update': <></>,
  'restore-backup': <></>
}

export const getMenuComponent = (key: string) => {
  return menuComponents[key]
}
