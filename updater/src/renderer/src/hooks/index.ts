import { MessageInstance } from 'antd/es/message/interface'
import { atom, useRecoilState } from 'recoil'

interface GlobalStore {
  enableBackup: boolean
  modsPath: string
  messageApi: MessageInstance | null
  isUpdating: boolean
  selectedMenuItem: string
}
const globalStoreAtom = atom<GlobalStore>({
  key: 'global-store',
  default: {
    enableBackup: true,
    modsPath: '',
    messageApi: null,
    isUpdating: false,
    selectedMenuItem: 'easy-update'
  }
})

export const useGlobalStore = () => {
  const [store, setStore] = useRecoilState(globalStoreAtom)

  const setters = {
    setEnableBackup: (value: boolean) => {
      setStore((state) => ({ ...state, enableBackup: value }))
    },
    setModsPath: (value: string) => {
      setStore((state) => ({ ...state, modsPath: value }))
    },
    setMessageApi: (value: MessageInstance | null) => {
      setStore((state) => ({ ...state, messageApi: value }))
    },
    setIsUpdating: (value: boolean) => {
      setStore((state) => ({ ...state, isUpdating: value }))
    },
    setSelectedMenuItem: (value: string) => {
      setStore((state) => ({ ...state, selectedMenuItem: value }))
    }
  }

  return { ...store, ...setters }
}
