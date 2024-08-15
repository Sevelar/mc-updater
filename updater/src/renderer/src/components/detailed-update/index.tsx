import minecraftTitle from '@renderer/minecraft_title.png'
import { ChooseLauncher } from '../easy-update/choose-launcher'
import { ChoosePackage } from '../easy-update/choose-package'
import { ChooseDirectory } from '../easy-update/index.choose-directory'
import { UpdateModpack } from '../easy-update/index.update-modpack'
import { Options } from './options'

export const DetailedUpdate = () => {
  return (
    <>
      <img src={minecraftTitle} className="object-contain mb-5 h-80" />
      <div className="flex flex-col gap-10">
        <ChooseLauncher detailed />
        <ChooseDirectory detailed />
        <ChoosePackage.Detailed />
        <Options />
        <UpdateModpack />
      </div>
    </>
  )
}
