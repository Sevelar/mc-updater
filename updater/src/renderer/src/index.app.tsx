import Flex from 'antd/es/flex'
import useMessage from 'antd/es/message/useMessage'
import { ChooseDirectory } from './components/choose-directory'
import { Options } from './components/options'
import { UpdateModpack } from './components/update-modpack'
import minecraftTitle from './minecraft_title.png'

export function App(): JSX.Element {
  const [message, contextHolder] = useMessage()

  return (
    <Flex vertical className="p-10">
      {contextHolder}
      <img src={minecraftTitle} className="h-40 object-contain" />
      <ChooseDirectory {...{ message }} />
      <Options />
      <UpdateModpack {...{ message }} />
    </Flex>
  )
}
