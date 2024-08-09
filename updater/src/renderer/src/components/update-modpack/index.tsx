import { RendererAPI } from '@shared/index.types'
import { Button } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import { ReactNode } from 'react'
import { t } from '../../../../index.consts'

const rendererAPI = window.api as RendererAPI

interface UpdateModpackProps {
  message: MessageInstance
}
export const UpdateModpack = ({ message }: UpdateModpackProps): ReactNode => {
  async function onUpdateModpack(): Promise<void> {
    try {
      await rendererAPI.updateModpack('modsPath')
      message.success(t.success_modpack_updated)
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      }
    }
  }

  return (
    <Button type="primary" size="large" className="mt-5" onClick={onUpdateModpack}>
      Update Modpack
    </Button>
  )
}
