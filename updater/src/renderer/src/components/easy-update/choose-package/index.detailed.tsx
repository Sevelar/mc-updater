import { RocketTwoTone } from '@ant-design/icons'
import { Radio, Tooltip } from 'antd'

export const Detailed = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <RocketTwoTone twoToneColor="red" className="mr-1" />
        <span className="mr-2 font-semibold">Modpack version:</span>
      </div>
      <Radio.Group defaultValue={'compact-install'}>
        <Tooltip title="Only installs mods required by the server.">
          <Radio.Button value="compact-install">Compact Installation</Radio.Button>
        </Tooltip>
        <Tooltip title="Installs required mods and a couple of extra client-side mods.">
          <Radio.Button value="full-install">Full Installation</Radio.Button>
        </Tooltip>
      </Radio.Group>
    </div>
  )
}
