import minecraftTitle from '@renderer/minecraft_title.png'
import { ChooseLauncher } from './choose-launcher'
import { ChoosePackage } from './choose-package'
import { ChooseDirectory } from './index.choose-directory'
import { UpdateModpack } from './index.update-modpack'

export const EasyUpdate = () => {
  return (
    <>
      <img src={minecraftTitle} className="object-contain mb-5 h-40" />
      <div className="flex flex-col gap-5">
        <ChooseLauncher />
        <ChooseDirectory />
        <ChoosePackage.Simple />
        <UpdateModpack />
      </div>
    </>
  )
}
