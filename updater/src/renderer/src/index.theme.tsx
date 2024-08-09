import { ConfigProvider, ThemeConfig } from 'antd'
import { ReactNode } from 'react'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#ef4444'
  }
}

interface ThemeProviderProps {
  children: ReactNode
}
export function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
  return <ConfigProvider {...{ theme }}>{children}</ConfigProvider>
}
