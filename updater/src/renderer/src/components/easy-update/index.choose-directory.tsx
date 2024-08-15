import { FolderOpenOutlined, FolderTwoTone } from '@ant-design/icons'
import { useGlobalStore } from '@renderer/hooks'
import { t } from '@shared/index.consts'
import { RendererAPI } from '@shared/index.types'
import { Button, Input, Space, Typography } from 'antd'
import { ReactNode, useEffect } from 'react'

const { Compact } = Space
const { Paragraph, Text } = Typography

const rendererAPI = window.api as RendererAPI

export function ChooseDirectory(): ReactNode {
  const { messageApi, modsPath, isUpdating, setModsPath } = useGlobalStore()

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
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <FolderTwoTone className="text-xl" twoToneColor="#ef4444" />
        <span className="text-xl font-semibold">Mods Path:</span>
      </div>

      <Compact size="large">
        <Input
          value={modsPath}
          className="hover:!border-red-500 focus:!border-red-500 focus-within:!border-red-500"
        ></Input>
        <Button
          icon={<FolderOpenOutlined />}
          className="hover:!border-red-500 hover:!text-red-500"
          onClick={() => !isUpdating && onChooseDirectory()}
          disabled={isUpdating}
        >
          Choose directory...
        </Button>
      </Compact>

      <Paragraph className="!m-0">
        The <Text strong>mods folder</Text> should be by default located in{' '}
        <Text code>C:\Users\%USERPROFILE\AppData\Roaming\.minecraft</Text>
        folder.
        <ul className="!m-0">
          <li>
            In case you use Prism Launcher:{' '}
            <Text code>{`<PRIMS_LAUNCHER_FOLDER>\\instances\\<INSTANCE_NAME>\\.minecraft`}</Text>
          </li>
        </ul>
      </Paragraph>
    </div>
  )
}
