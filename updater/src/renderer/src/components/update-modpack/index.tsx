import { useOptions } from '@renderer/index.hooks'
import { t } from '@shared/index.consts'
import { RendererAPI } from '@shared/index.types'
import { Button } from 'antd'
import { ReactNode, useState } from 'react'

const rendererAPI = window.api as RendererAPI

export const UpdateModpack = (): ReactNode => {
  const { options } = useOptions()
  const { messageApi, modsPath, enableBackup } = options

  const [isLoading, setIsLoading] = useState(false)

  async function onUpdateModpack(): Promise<void> {
    setIsLoading(true)
    try {
      await rendererAPI.updateModpack(modsPath, { enableBackup })
      messageApi!.success(t.success_modpack_updated)
    } catch (error) {
      if (error instanceof Error) {
        messageApi!.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="primary"
      size="large"
      className="mt-5"
      onClick={onUpdateModpack}
      loading={isLoading}
    >
      Update Modpack
    </Button>
  )
}
