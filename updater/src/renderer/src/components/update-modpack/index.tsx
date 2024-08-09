import { useOptions } from '@renderer/index.hooks'
import { t } from '@shared/index.consts'
import { RendererAPI } from '@shared/index.types'
import { Button } from 'antd'
import { ReactNode } from 'react'

const rendererAPI = window.api as RendererAPI

export const UpdateModpack = (): ReactNode => {
  const { options } = useOptions()
  const { messageApi } = options

  async function onUpdateModpack(): Promise<void> {
    try {
      await rendererAPI.updateModpack('modsPath')
      messageApi!.success(t.success_modpack_updated)
    } catch (error) {
      if (error instanceof Error) {
        messageApi!.error(error.message)
      }
    }
  }

  return (
    <Button type="primary" size="large" className="mt-5" onClick={onUpdateModpack}>
      Update Modpack
    </Button>
  )
}
