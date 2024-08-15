import { GlobalStore, LauncherKey, MenuItemKey } from '@renderer/types'
import { MessageInstance } from 'antd/es/message/interface'
import { atom, useRecoilState } from 'recoil'

const globalStoreAtom = atom<GlobalStore>({
  key: 'global-store',
  default: {
    isBackupEnabled: true,
    isModpackUpdating: false,
    selectedMenuItem: 'easy-update',
    selectedLauncher: 'vanilla-launcher',
    modsPath: '',
    messageApi: null
  }
})

export const useGlobalStore = () => {
  const [store, setStore] = useRecoilState(globalStoreAtom)

  const setters = {
    setIsBackupEnabled: (value: boolean) => {
      setStore((state) => ({ ...state, isBackupEnabled: value }))
    },
    setIsModpackUpdating: (value: boolean) => {
      setStore((state) => ({ ...state, isModpackUpdating: value }))
    },
    setSelectedMenuItem: (value: MenuItemKey) => {
      setStore((state) => ({ ...state, selectedMenuItem: value }))
    },
    setSelectedLauncher: (value: LauncherKey) => {
      setStore((state) => ({ ...state, selectedLauncher: value }))
    },
    setModsPath: (value: string) => {
      setStore((state) => ({ ...state, modsPath: value }))
    },
    setMessageApi: (value: MessageInstance | null) => {
      setStore((state) => ({ ...state, messageApi: value }))
    }
  }

  return { ...store, ...setters }
}
