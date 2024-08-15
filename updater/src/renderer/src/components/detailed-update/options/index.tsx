import { ReactNode } from 'react'
import { Backup } from './index.backup'

export function Options(): ReactNode {
  return (
    <div className="flex flex-col rounded-lg p-2 bg-gray-200">
      <Backup />
    </div>
  )
}
