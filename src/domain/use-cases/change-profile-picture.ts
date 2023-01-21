import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile } from '@/domain/contracts/upload'
import { LoadUserPicture, SaveUserPicture } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'

type Input = {
  id: string
  file?: Buffer
}
export type ChangeProfilePicture = (input: Input) => Promise<void>
type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfile: SaveUserPicture & LoadUserPicture) => ChangeProfilePicture

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  const data: { pictureUrl?: string, name?: string } = {}
  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
  } else {
    data.name = (await userProfileRepo.load({ id })).name
  }
  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)
  await userProfileRepo.savePicture(userProfile)
}
