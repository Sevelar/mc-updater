import { ThunderboltTwoTone } from '@ant-design/icons'
import { useGlobalStore } from '@renderer/hooks'
import { LauncherKey, launcherKeys } from '@renderer/types'
import { Select } from 'antd'
import { launchers } from './index.consts'

export const ChooseLauncher = () => {
  const { setSelectedLauncher } = useGlobalStore()

  const onOptionSelect = (key: string) => {
    if (launcherKeys.includes(key as LauncherKey)) {
      setSelectedLauncher(key as LauncherKey)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <ThunderboltTwoTone className="text-xl" twoToneColor="#ef4444" />
        <span className="text-xl font-semibold">Select your launcher:</span>
      </div>
      <Select
        size="large"
        defaultValue="vanilla-launcher"
        options={launchers}
        onSelect={onOptionSelect}
      />
    </div>
  )
}
