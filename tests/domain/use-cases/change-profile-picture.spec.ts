import { mock, MockProxy } from 'jest-mock-extended'
import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/use-cases'
import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile } from '@/domain/contracts/upload'
import { SaveUserPicture, LoadUserPicture } from '@/domain/contracts/repos'

describe('ChangeProfilePicture', () => {
  let uuid: string
  let file: Buffer
  let fileStorage: MockProxy<UploadFile>
  let userProfile: MockProxy<SaveUserPicture & LoadUserPicture>
  let crypto: MockProxy<UUIDGenerator>
  let sut: ChangeProfilePicture

  beforeAll(() => {
    uuid = 'any-unique-id'
    file = Buffer.from('any-buffer')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any-url')
    userProfile = mock()
    crypto = mock()
    crypto.uuid.mockReturnValue(uuid)
  })
  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, crypto, userProfile)
  })

  it('should call UploadFile with correct input', async () => {
    await sut({ id: 'any-id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should not call UploadFile if input is undefined', async () => {
    await sut({ id: 'any-id', file: undefined })

    expect(fileStorage.upload).not.toHaveBeenCalled()
  })

  it('should call SaveUserPicture with correct input', async () => {
    await sut({ id: 'any-id', file })

    expect(userProfile.savePicture).toHaveBeenCalledWith({ pictureUrl: 'any-url', initials: undefined })
    expect(userProfile.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call SaveUserPicture with correct input when file is undefined', async () => {
    await sut({ id: 'any-id', file: undefined })

    expect(userProfile.savePicture).toHaveBeenCalledWith({ pictureUrl: undefined })
    expect(userProfile.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call LoadUserPicture with correct input', async () => {
    await sut({ id: 'any-id', file: undefined })

    expect(userProfile.load).toHaveBeenCalledWith({ id: 'any-id' })
    expect(userProfile.load).toHaveBeenCalledTimes(1)
  })
})
