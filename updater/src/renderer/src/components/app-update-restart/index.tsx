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
    <div className="fixed top-0 left-0 h-full w-full bg-white">
      <Result
        title="Application update has been downloaded!"
        extra={[
          <Button key="restart" type="primary" size="large" onClick={rendererAPI.installAppUpdate}>
            Restart the application
          </Button>
        ]}
        className="flex flex-col justify-center items-center h-full"
      />
    </div>
  ) : null
}
