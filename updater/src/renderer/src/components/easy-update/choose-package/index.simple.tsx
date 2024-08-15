import { RocketTwoTone } from '@ant-design/icons'
import { Select } from 'antd'
import { packages } from './index.consts'

export const Simple = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <RocketTwoTone twoToneColor="red" className="text-xl mr-1" />
        <span className="mr-2 text-lg font-semibold">Modpack version:</span>
      </div>
      <Select options={packages} size="large" defaultValue={'modpack-compact'} />
    </div>
  )
}
