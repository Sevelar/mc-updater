import { useGlobalStore } from '@renderer/hooks'
import { t } from '@shared/index.consts'
import { RendererAPI } from '@shared/index.types'
import { Button } from 'antd'
import { ReactNode } from 'react'

const rendererAPI = window.api as RendererAPI

export const UpdateModpack = (): ReactNode => {
  const { messageApi, modsPath, isBackupEnabled, isModpackUpdating, setIsModpackUpdating } =
    useGlobalStore()

  async function onUpdateModpack(): Promise<void> {
    setIsModpackUpdating(true)
    try {
      await rendererAPI.updateModpack(modsPath, { isBackupEnabled })
      messageApi!.success(t.success_modpack_updated)
    } catch (error) {
      if (error instanceof Error) {
        messageApi!.error(error.message)
      }
    } finally {
      setIsModpackUpdating(false)
    }
  }

  return (
    <Button
      type="primary"
      size="large"
      onClick={() => !isModpackUpdating && onUpdateModpack()}
      loading={isModpackUpdating}
    >
      Update Modpack
    </Button>
  )
}
