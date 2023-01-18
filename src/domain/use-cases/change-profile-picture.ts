import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile } from '@/domain/contracts/upload'
import { LoadUserPicture, SaveUserPicture } from '@/domain/contracts/repos'

type Input = {
  id: string
  file?: Buffer
}
export type ChangeProfilePicture = (input: Input) => Promise<void>
type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfile: SaveUserPicture & LoadUserPicture) => ChangeProfilePicture

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfile) => async ({ id, file }) => {
  let pictureUrl: string | undefined
  let initials: string | undefined
  if (file !== undefined) {
    pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
  } else {
    const { name } = await userProfile.load({ id })
    if (name !== undefined) {
      const firstLetters = name.match(/\b(.)/g) ?? []
      initials = `${firstLetters.shift()?.toUpperCase() ?? ''}${firstLetters.pop()?.toUpperCase() ?? ''}`
    }
  }
  await userProfile.savePicture({ pictureUrl, initials })
}
