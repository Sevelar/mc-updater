import Flex from 'antd/es/flex'
import { ReactNode } from 'react'
import { Backup } from './index.backup'

export function Options(): ReactNode {
  return (
    <Flex vertical className="bg-gray-200 p-2 rounded-lg">
      <Backup />
    </Flex>
  )
}
