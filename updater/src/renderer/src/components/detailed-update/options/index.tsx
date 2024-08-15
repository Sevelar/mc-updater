import { ReactNode } from 'react'
import { Backup } from './index.backup'

export function Options(): ReactNode {
  return (
    <div className="flex flex-col rounded-lg py-4 px-8 bg-gray-200">
      <Backup />
    </div>
  )
}
