import minecraftTitle from '@renderer/minecraft_title.png'
import { ChooseLauncher } from '../easy-update/choose-launcher'
import { ChoosePackage } from '../easy-update/choose-package'
import { ChooseDirectory } from '../easy-update/index.choose-directory'
import { UpdateModpack } from '../easy-update/index.update-modpack'
import { Options } from './options'

export const DetailedUpdate = () => {
  return (
    <>
      <img src={minecraftTitle} className="object-contain mb-5 h-32" />
      <div className="flex flex-col gap-3">
        <ChooseLauncher />
        <ChooseDirectory />
        <ChoosePackage.Detailed />
        <Options />
        <UpdateModpack />
      </div>
    </>
  )
}
