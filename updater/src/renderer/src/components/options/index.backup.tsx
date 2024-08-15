import { useGlobalStore } from '@renderer/index.hooks'
import Checkbox from 'antd/es/checkbox/Checkbox'
import Flex from 'antd/es/flex'
import Paragraph from 'antd/es/typography/Paragraph'
import Text from 'antd/es/typography/Text'
import { ReactNode, useEffect, useState } from 'react'

export function Backup(): ReactNode {
  const { isUpdating, enableBackup, setEnableBackup } = useGlobalStore()

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
    <Flex vertical gap={5}>
      <Flex gap={5}>
        <Checkbox
          checked={enableBackup}
          onChange={(e) => !isUpdating && setEnableBackup(e.target.checked)}
          disabled={isUpdating}
        />
        <Text strong>
          Create <Text code>mods</Text> folder backup before update.
        </Text>
      </Flex>
      <Paragraph className="!m-0">
        <Text>
          Creates a new folder called <Text code>mods-{timestamp}</Text>, where all mods from
          original <Text code>mods</Text> folder will be moved to.
        </Text>
        <br />
        <Text>
          In case something bad happens, the application will attempt to recover previous mods,
          using this backup.
        </Text>
        <br />
        <Text strong>
          By opting out of this option, you&apos;re consenting to replacement of ALL mods in the{' '}
          <Text code>mods</Text> folder!
        </Text>
      </Paragraph>
    </Flex>
  )
}
