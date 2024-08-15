import minecraftTitle from '@renderer/minecraft_title.png'
import { ChooseDirectory } from '../choose-directory'
import { Options } from '../options'
import { UpdateModpack } from '../update-modpack'

export const EasyUpdate = () => {
  return (
    <>
      <img src={minecraftTitle} className="object-contain mb-5 h-40" />
      <ChooseDirectory />
      <Options />
      <UpdateModpack />
    </>
  )
}
