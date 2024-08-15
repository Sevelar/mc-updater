import Flex from 'antd/es/flex'
import useMessage from 'antd/es/message/useMessage'
import { useEffect } from 'react'
import { ChooseDirectory } from './components/choose-directory'
import { Modals } from './components/modals'
import { Options } from './components/options'
import { UpdateModpack } from './components/update-modpack'
import { useGlobalStore } from './index.hooks'
import minecraftTitle from './minecraft_title.png'

export function App(): JSX.Element {
  const [message, contextHolder] = useMessage()
  const { setMessageApi } = useGlobalStore()

  useEffect(() => {
    if (!message) return
    setMessageApi(message)
  }, [message])

  return (
    <Flex vertical className="p-10">
      {contextHolder}
      <img src={minecraftTitle} className="h-40 object-contain" />
      <ChooseDirectory />
      <Options />
      <UpdateModpack />
      <Modals />
    </Flex>
  )
}
