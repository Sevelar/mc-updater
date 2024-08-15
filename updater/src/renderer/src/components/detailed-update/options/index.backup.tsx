import { InfoCircleFilled } from '@ant-design/icons'
import { useGlobalStore } from '@renderer/hooks'
import { Tooltip } from 'antd'
import Checkbox from 'antd/es/checkbox/Checkbox'
import Text from 'antd/es/typography/Text'
import { ReactNode, useEffect, useState } from 'react'

export function Backup(): ReactNode {
  const { isModpackUpdating, isBackupEnabled, setIsBackupEnabled } = useGlobalStore()

  const [timestamp, setTimestamp] = useState(Date.now())

  function setUnixTimestamp(): void {
    setTimestamp(Date.now())
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setUnixTimestamp()
    }, 1_000)

    return (): void => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isBackupEnabled}
          onChange={(e) => !isModpackUpdating && setIsBackupEnabled(e.target.checked)}
          disabled={isModpackUpdating}
        />
        <Tooltip
          className="flex gap-1 items-center leading-none"
          color="white"
          title={<TooltipContent {...{ timestamp }} />}
        >
          <span className="font-semibold">
            Create <Text code>mods</Text> folder backup before update.
          </span>
          <span className="text-xs italic">(Reveal more info)</span>
          <InfoCircleFilled className="text-red-500" />
        </Tooltip>
      </div>
    </div>
  )
}

interface TooltipContentProps {
  timestamp: number
}
const TooltipContent = ({ timestamp }: TooltipContentProps) => {
  return (
    <div className="p-2">
      <Text>
        Creates a new folder called <Text code>mods-{timestamp}</Text>, where all mods from original{' '}
        <Text code>mods</Text> folder will be moved to.
      </Text>
      <br />
      <Text>
        In case something bad happens, the application will attempt to recover previous mods, using
        this backup.
      </Text>
      <br />
      <Text strong>
        By opting out of this option, you&apos;re consenting to replacement of ALL mods in the{' '}
        <Text code>mods</Text> folder!
      </Text>
    </div>
  )
}
