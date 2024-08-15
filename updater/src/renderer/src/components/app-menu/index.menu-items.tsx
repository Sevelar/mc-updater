import { useGlobalStore } from '@renderer/hooks'
import { Menu, MenuProps } from 'antd'
import { menuItems } from './index.consts'

export const Items = () => {
  const { setSelectedMenuItem } = useGlobalStore()

  const onMenuItemClick: MenuProps['onClick'] = (info) => {
    setSelectedMenuItem(info.key)
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
