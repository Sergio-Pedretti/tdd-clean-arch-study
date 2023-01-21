import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile, DeleteFile } from '@/domain/contracts/upload'
import { LoadUserPicture, SaveUserPicture } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'

type Input = {
  id: string
  file?: Buffer
}
type Output = {
  pictureUrl?: string
  initials?: string
}
export type ChangeProfilePicture = (input: Input) => Promise<Output>
type Setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfile: SaveUserPicture & LoadUserPicture) => ChangeProfilePicture

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  const data: { pictureUrl?: string, name?: string } = {}
  const key = crypto.uuid({ key: id })
  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file, key })
  } else {
    data.name = (await userProfileRepo.load({ id })).name
  }
  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)
  try {
    await userProfileRepo.savePicture(userProfile)
  } catch {
    if (file !== undefined) await fileStorage.delete({ key })
    throw new Error()
  }
  return {
    pictureUrl: userProfile.pictureUrl,
    initials: userProfile.initials
  }
}
