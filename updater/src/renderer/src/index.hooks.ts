import { MessageInstance } from 'antd/es/message/interface'
import { atom, useRecoilState } from 'recoil'

interface Options {
  enableBackup: boolean
  modsPath: string
  messageApi: MessageInstance | null
}
const optionsAtom = atom<Options>({
  key: 'options',
  default: {
    enableBackup: true,
    modsPath: '',
    messageApi: null
  }
})

export const useOptions = () => {
  const [options, setOptions] = useRecoilState(optionsAtom)

  const setEnableBackup = (value: boolean) =>
    setOptions((state) => ({ ...state, enableBackup: value }))

  const setModsPath = (value: string) => setOptions((state) => ({ ...state, modsPath: value }))

  const setMessageApi = (value: MessageInstance | null) =>
    setOptions((state) => ({ ...state, messageApi: value }))

  return { options, setEnableBackup, setModsPath, setMessageApi }
}
