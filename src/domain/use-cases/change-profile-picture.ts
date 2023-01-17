import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile } from '@/domain/contracts/upload'

type Input = {
  id: string
  file?: Buffer
}
export type ChangeProfilePicture = (input: Input) => Promise<void>
type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture

export const setupChangeProfilePicture: Setup = (fileStorage, crypto) => async ({ id, file }) => {
  if (file !== undefined) {
    await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
  }
}
