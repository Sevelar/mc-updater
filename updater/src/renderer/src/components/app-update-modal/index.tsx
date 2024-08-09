import { RendererAPI } from '@shared/index.types'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'

const rendererAPI = window.api as RendererAPI

export const AppUpdateModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    rendererAPI.onAppUpdateAvailable(() => {
      setIsOpen(true)
    })
  }, [])

  const onOk = () => {
    rendererAPI.downloadAppUpdate()
  }

  const onCancel = () => {
    setIsOpen(false)
  }

  return (
    <Modal title="Application Update available!" open={isOpen} {...{ onOk, onCancel }}>
      A new update for the Updater application is available.
    </Modal>
  )
}
