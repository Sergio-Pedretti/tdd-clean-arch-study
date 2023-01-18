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
  if (file !== undefined) {
    pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
  }
  await userProfile.savePicture({ pictureUrl })
  await userProfile.load({ id })
}
