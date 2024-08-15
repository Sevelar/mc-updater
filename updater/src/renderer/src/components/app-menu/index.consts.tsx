import { SettingTwoTone, ThunderboltTwoTone, ToolTwoTone } from '@ant-design/icons'
import { MenuComponents, MenuItemKey } from '@renderer/types'
import { MenuProps } from 'antd'
import { DetailedUpdate } from '../detailed-update'
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

export const menuComponents: MenuComponents = {
  'easy-update': <EasyUpdate />,
  'detailed-update': <DetailedUpdate />,
  'restore-backup': <></>
}

export const getMenuComponent = (key: MenuItemKey) => {
  return menuComponents[key]
}
