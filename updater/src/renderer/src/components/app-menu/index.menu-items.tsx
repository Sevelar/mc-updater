import { useGlobalStore } from '@renderer/hooks'
import { MenuItemKey, menuItemKeys } from '@renderer/types'
import { Menu, MenuProps } from 'antd'
import { menuItems } from './index.consts'

export const Items = () => {
  const { setSelectedMenuItem } = useGlobalStore()

  const onMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    if (typeof key === 'string' && menuItemKeys.includes(key as MenuItemKey)) {
      setSelectedMenuItem(key as MenuItemKey)
    }
  }

  return (
    <Menu
      items={menuItems}
      defaultSelectedKeys={['easy-update']}
      mode="inline"
      onClick={onMenuItemClick}
    />
  )
}
