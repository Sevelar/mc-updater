import { FolderOpenOutlined, FolderTwoTone } from '@ant-design/icons'
import Button from 'antd/es/button'
import Flex from 'antd/es/flex'
import Input from 'antd/es/input'
import useMessage from 'antd/es/message/useMessage'
import Compact from 'antd/es/space/Compact'
import Typography from 'antd/es/typography'
import { useEffect, useState } from 'react'
import { t } from '../../index.consts'
import { CustomError, RendererAPI } from '../../index.types'
import minecraftTitle from './minecraft_title.png'

const rendererAPI = window.api as RendererAPI
const { Title, Paragraph, Text } = Typography

export function App(): JSX.Element {
  const [message, contextHolder] = useMessage()
  const [modsPath, setModsPath] = useState('')

  async function onGetModsPath(): Promise<void> {
    try {
      const path = await rendererAPI.getModsPath()
      setModsPath(path)
    } catch (error) {
      if (error instanceof CustomError) {
        message.error(error.message)
      }
    }
  }

  async function onChooseDirectory(): Promise<void> {
    try {
      const path = await rendererAPI.chooseDirectory()
      if (typeof path === 'string') {
        setModsPath(path)
        message.success(t.success_mods_path_changed)
      }
    } catch (error) {
      if (error instanceof CustomError) {
        message.error(error.message)
      }
    }
  }

  async function onUpdateModpack(): Promise<void> {
    try {
      await rendererAPI.updateModpack(modsPath)
      message.success(t.success_modpack_updated)
    } catch (error) {
      if (error instanceof CustomError) {
        message.error(error.message)
      }
    }
  }

  useEffect(() => {
    onGetModsPath()
  }, [])

  return (
    <Flex vertical className="p-10">
      {contextHolder}
      <img src={minecraftTitle} className="h-40 object-contain" />
      <Compact className="gap-1 items-center">
        <FolderTwoTone className="text-xl mb-2" twoToneColor="#ef4444" />
        <Title level={4}>Minecraft Path:</Title>
      </Compact>
      <Flex vertical gap={10}>
        <Compact size="large">
          <Input
            value={modsPath}
            className="hover:!border-red-500 focus:!border-red-500 focus-within:!border-red-500"
          ></Input>
          <Button
            icon={<FolderOpenOutlined />}
            className="hover:!border-red-500 hover:!text-red-500"
            onClick={onChooseDirectory}
          >
            Choose directory...
          </Button>
        </Compact>
        <Paragraph>
          The <Text strong>.minecraft folder</Text> should be by default located in{' '}
          <Text code>C:\Users\%USERPROFILE\AppData\Roaming</Text>
          folder.
          <ul>
            <li>
              In case you use Prism Launcher:{' '}
              <Text code>{`<PRIMS_LAUNCHER_FOLDER>/instances/<INSTANCE_NAME>/.minecraft`}</Text>
            </li>
          </ul>
        </Paragraph>
      </Flex>
      <Button
        type="primary"
        size="large"
        className="bg-red-600 hover:!bg-red-500"
        onClick={onUpdateModpack}
      >
        Update modpack
      </Button>
    </Flex>
  )
}
