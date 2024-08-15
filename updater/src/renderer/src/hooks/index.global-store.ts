import { MessageInstance } from 'antd/es/message/interface'
import { atom, useRecoilState } from 'recoil'

interface GlobalStore {
  isBackupEnabled: boolean
  isModpackUpdating: boolean
  messageApi: MessageInstance | null
  selectedMenuItem: string
  modsPath: string
}
const globalStoreAtom = atom<GlobalStore>({
  key: 'global-store',
  default: {
    isBackupEnabled: true,
    isModpackUpdating: false,
    messageApi: null,
    selectedMenuItem: 'easy-update',
    modsPath: ''
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
    setMessageApi: (value: MessageInstance | null) => {
      setStore((state) => ({ ...state, messageApi: value }))
    },
    setSelectedMenuItem: (value: string) => {
      setStore((state) => ({ ...state, selectedMenuItem: value }))
    },
    setModsPath: (value: string) => {
      setStore((state) => ({ ...state, modsPath: value }))
    }
  }

  return { ...store, ...setters }
}
