import { RendererAPI } from '@shared/index.types'
import { Button, Result } from 'antd'
import { useEffect, useState } from 'react'

const rendererAPI = window.api as RendererAPI

export const AppUpdateRestart = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    rendererAPI.onAppUpdateDownloaded(() => {
      setIsOpen(true)
    })
  }, [])

  return isOpen ? (
    <Result
      title="Application update has been downloaded!"
      extra={[
        <Button key="restart" type="primary" onClick={rendererAPI.installAppUpdate}>
          Restart the application
        </Button>
      ]}
    />
  ) : null
}
