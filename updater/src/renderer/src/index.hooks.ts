import { MessageInstance } from 'antd/es/message/interface'
import { atom, useRecoilState } from 'recoil'

interface Options {
  messageApi: MessageInstance | null
  enableBackup: boolean
}
const optionsAtom = atom<Options>({
  key: 'options',
  default: {
    messageApi: null,
    enableBackup: true
  }
})

export const useOptions = () => {
  const [options, setOptions] = useRecoilState(optionsAtom)

  const setEnableBackup = (value: boolean) => setOptions({ ...options, enableBackup: value })

  const setMessageApi = (value: MessageInstance | null) =>
    setOptions({ ...options, messageApi: value })

  return { options, setEnableBackup, setMessageApi }
}
