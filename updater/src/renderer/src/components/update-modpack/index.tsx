import { useGlobalStore } from '@renderer/index.hooks'
import { t } from '@shared/index.consts'
import { RendererAPI } from '@shared/index.types'
import { Button } from 'antd'
import { ReactNode } from 'react'

const rendererAPI = window.api as RendererAPI

export const UpdateModpack = (): ReactNode => {
  const { messageApi, modsPath, enableBackup, isUpdating, setIsUpdating } = useGlobalStore()

  async function onUpdateModpack(): Promise<void> {
    setIsUpdating(true)
    try {
      await rendererAPI.updateModpack(modsPath, { enableBackup })
      messageApi!.success(t.success_modpack_updated)
    } catch (error) {
      if (error instanceof Error) {
        messageApi!.error(error.message)
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Button
      type="primary"
      size="large"
      className="mt-5"
      onClick={() => !isUpdating && onUpdateModpack()}
      loading={isUpdating}
    >
      Update Modpack
    </Button>
  )
}
