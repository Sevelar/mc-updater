import { Layout } from 'antd'
import useMessage from 'antd/es/message/useMessage'
import { useEffect } from 'react'
import { AppMenu } from './components/app-menu'
import { Modals } from './components/modals'
import { useGlobalStore } from './hooks'

export function App(): JSX.Element {
  const [message, contextHolder] = useMessage()
  const { setMessageApi } = useGlobalStore()

  useEffect(() => {
    if (!message) return
    setMessageApi(message)
  }, [message])

  return (
    <Layout>
      {contextHolder}
      <Modals />
      <Layout.Sider className="py-10 !bg-white">
        <AppMenu.Items />
      </Layout.Sider>
      <Layout.Content className="flex flex-col justify-center px-15">
        <AppMenu.Content />
      </Layout.Content>
    </Layout>
  )
}
