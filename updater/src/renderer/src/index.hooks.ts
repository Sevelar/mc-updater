import { MessageInstance } from 'antd/es/message/interface'
import { atom, useRecoilState } from 'recoil'

interface GlobalStore {
  enableBackup: boolean
  modsPath: string
  messageApi: MessageInstance | null
  isUpdating: boolean
}
const globalStoreAtom = atom<GlobalStore>({
  key: 'options',
  default: {
    enableBackup: true,
    modsPath: '',
    messageApi: null,
    isUpdating: false
  }
})

export const useGlobalStore = () => {
  const [store, setStore] = useRecoilState(globalStoreAtom)

  const setEnableBackup = (value: boolean) =>
    setStore((state) => ({ ...state, enableBackup: value }))

  const setModsPath = (value: string) => setStore((state) => ({ ...state, modsPath: value }))

  const setMessageApi = (value: MessageInstance | null) =>
    setStore((state) => ({ ...state, messageApi: value }))

  const setIsUpdating = (value: boolean) => setStore((state) => ({ ...state, isUpdating: value }))

  return { store, setEnableBackup, setModsPath, setMessageApi, setIsUpdating }
}
