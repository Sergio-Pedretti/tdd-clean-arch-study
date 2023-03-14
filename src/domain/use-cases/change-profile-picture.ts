import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile, DeleteFile } from '@/domain/contracts/upload'
import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'

type Input = {
  id: string
  file?: {
    buffer: Buffer
    mimeType: string
  }
}
type Output = {
  pictureUrl?: string
  initials?: string
}
export type ChangeProfilePicture = (input: Input) => Promise<Output>
type Setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfile: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  const data: { pictureUrl?: string, name?: string } = {}
  const key = crypto.uuid({ key: id })
  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file: file.buffer, key })
  } else {
    data.name = (await userProfileRepo.load({ id }))?.name
  }
  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)
  try {
    await userProfileRepo.savePicture(userProfile)
  } catch (error) {
    if (file !== undefined) await fileStorage.delete({ key })
    throw error
  }
  return {
    pictureUrl: userProfile.pictureUrl,
    initials: userProfile.initials
  }
}
