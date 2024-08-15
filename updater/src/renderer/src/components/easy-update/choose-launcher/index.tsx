import { ThunderboltTwoTone } from '@ant-design/icons'
import { useGlobalStore } from '@renderer/hooks'
import { LauncherKey, launcherKeys } from '@renderer/types'
import { Select } from 'antd'
import clsx from 'clsx'
import { launchers } from './index.consts'

interface ChooseLauncherProps {
  detailed?: boolean
}
export const ChooseLauncher = ({ detailed }: ChooseLauncherProps) => {
  const { setSelectedLauncher } = useGlobalStore()

  const onOptionSelect = (key: string) => {
    if (launcherKeys.includes(key as LauncherKey)) {
      setSelectedLauncher(key as LauncherKey)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <ThunderboltTwoTone className={clsx({ 'text-xl': !detailed })} twoToneColor="#ef4444" />
        <span
          className={clsx('font-semibold', {
            'text-xl': !detailed
          })}
        >
          Select your launcher:
        </span>
      </div>
      <Select
        size={detailed ? 'middle' : 'large'}
        defaultValue="vanilla-launcher"
        options={launchers}
        onSelect={onOptionSelect}
      />
    </div>
  )
}
