import { FolderOpenOutlined, FolderTwoTone } from '@ant-design/icons'
import { useOptions } from '@renderer/index.hooks'
import { t } from '@shared/index.consts'
import { RendererAPI } from '@shared/index.types'
import { Button, Flex, Input, Space, Typography } from 'antd'
import { ReactNode, useEffect } from 'react'

const { Compact } = Space
const { Paragraph, Title, Text } = Typography

const rendererAPI = window.api as RendererAPI

export function ChooseDirectory(): ReactNode {
  const { options, setModsPath } = useOptions()
  const { messageApi, modsPath } = options

  async function onGetModsPath(): Promise<void> {
    try {
      const path = await rendererAPI.getModsPath()
      setModsPath(path)
    } catch (error) {
      if (error instanceof Error) {
        messageApi!.error(error.message)
      }
    }
  }

  async function onChooseDirectory(): Promise<void> {
    try {
      const path = await rendererAPI.chooseDirectory()
      if (typeof path === 'string') {
        setModsPath(path)
        messageApi!.success(t.success_mods_path_changed)
      }
    } catch (error) {
      if (error instanceof Error) {
        messageApi!.error(error.message)
      }
    }
  }

  useEffect(() => {
    onGetModsPath()
  }, [])

  return (
    <Flex vertical>
      <Flex gap={5} align="center">
        <FolderTwoTone className="text-xl mb-2" twoToneColor="#ef4444" />
        <Title level={4}>Mods Path:</Title>
      </Flex>
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
        <Paragraph className="!m-0">
          The <Text strong>mods folder</Text> should be by default located in{' '}
          <Text code>C:\Users\%USERPROFILE\AppData\Roaming\.minecraft</Text>
          folder.
          <ul>
            <li>
              In case you use Prism Launcher:{' '}
              <Text code>{`<PRIMS_LAUNCHER_FOLDER>\\instances\\<INSTANCE_NAME>\\.minecraft`}</Text>
            </li>
          </ul>
        </Paragraph>
      </Flex>
    </Flex>
  )
}
