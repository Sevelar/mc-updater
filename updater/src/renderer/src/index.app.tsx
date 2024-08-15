import { Layout } from 'antd'
import useMessage from 'antd/es/message/useMessage'
import { useEffect } from 'react'
import { AppMenu } from './components/app-menu'
import { Modals } from './components/modals'
import { useGlobalStore } from './index.hooks'
import minecraftTitle from './minecraft_title.png'

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
      <Layout.Sider className="py-5 !bg-white">
        <img src={minecraftTitle} className="object-contain p-2" />
        <AppMenu.Items />
      </Layout.Sider>
      <Layout.Content className="flex flex-col justify-center px-10">
        <AppMenu.Content />
      </Layout.Content>
    </Layout>
  )
}
