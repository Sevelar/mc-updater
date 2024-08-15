import { FireTwoTone } from '@ant-design/icons'
import { RendererAPI } from '@shared/index.types'
import { Modal } from 'antd'
import { Typography } from 'antd'
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
    <Modal
      open={isOpen}
      title={
        <>
          <FireTwoTone twoToneColor="red" className="mr-1" />
          <Typography.Text strong>Application update available!</Typography.Text>
        </>
      }
      centered
      okText="Update"
      {...{ onOk, onCancel }}
    >
      A new update for the updater application is available.
    </Modal>
  )
}
