import { useGlobalStore } from '@renderer/hooks'
import minecraftTitle from '@renderer/minecraft_title.png'
import { MenuItemKey, menuItemKeys } from '@renderer/types'
import { Menu, MenuProps } from 'antd'
import { menuItems } from './index.consts'

export const Items = () => {
  const { setSelectedMenuItem } = useGlobalStore()

  const onMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    if (menuItemKeys.includes(key as MenuItemKey)) {
      setSelectedMenuItem(key as MenuItemKey)
    }
  }

  return (
    <>
      <img src={minecraftTitle} className="object-contain p-5" />
      <Menu
        items={menuItems}
        defaultSelectedKeys={['easy-update']}
        mode="inline"
        onClick={onMenuItemClick}
      />
    </>
  )
}
