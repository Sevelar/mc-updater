import { useGlobalStore } from '@renderer/index.hooks'
import { getMenuComponent } from './index.consts'

export const Content = () => {
  const { selectedMenuItem } = useGlobalStore()

  return getMenuComponent(selectedMenuItem)
}
