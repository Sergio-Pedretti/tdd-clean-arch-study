import { mock, MockProxy } from 'jest-mock-extended'
import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/use-cases'
import { UUIDGenerator } from '@/domain/contracts/crypto'
import { UploadFile, DeleteFile } from '@/domain/contracts/upload'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'
import { mocked } from 'ts-jest/utils'

jest.mock('@/domain/entities/user-profile')

describe('ChangeProfilePicture', () => {
  let uuid: string
  let file: Buffer
  let fileStorage: MockProxy<UploadFile & DeleteFile>
  let userProfile: MockProxy<SaveUserPicture & LoadUserProfile>
  let crypto: MockProxy<UUIDGenerator>
  let sut: ChangeProfilePicture

  beforeAll(() => {
    uuid = 'any-unique-id'
    file = Buffer.from('any-buffer')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any-url')
    userProfile = mock()
    userProfile.load.mockResolvedValue({ name: 'Sergio Italo Miranda Pedretti' })
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

    expect(userProfile.savePicture).toHaveBeenCalledWith(...mocked(UserProfile).mock.instances)
    expect(userProfile.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call SaveUserPicture with correct input', async () => {
    userProfile.load.mockResolvedValueOnce(undefined)

    await sut({ id: 'any-id', file })

    expect(userProfile.savePicture).toHaveBeenCalledWith(...mocked(UserProfile).mock.instances)
    expect(userProfile.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call LoadUserProfile with correct input', async () => {
    await sut({ id: 'any-id', file: undefined })

    expect(userProfile.load).toHaveBeenCalledWith({ id: 'any-id' })
    expect(userProfile.load).toHaveBeenCalledTimes(1)
  })

  it('should not call LoadUserProfile if file exists', async () => {
    await sut({ id: 'any-id', file })

    expect(userProfile.load).not.toHaveBeenCalled()
  })

  it('should return data on Success', async () => {
    mocked(UserProfile).mockImplementationOnce(id => ({
      setPicture: jest.fn(),
      id: 'any-id',
      initials: 'any-initial',
      pictureUrl: 'any-url'
    }))

    const result = await sut({ id: 'any-id', file })

    expect(result).toEqual({
      initials: 'any-initial',
      pictureUrl: 'any-url'
    })
  })

  it('should call DeleteFile when file exists and SaveUserPicture throws', async () => {
    expect.assertions(2)
    userProfile.savePicture.mockRejectedValueOnce(new Error())
    const promise = sut({ id: 'any-id', file })

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ key: uuid })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('should not call DeleteFile when file does not exists and SaveUserPicture throws', async () => {
    userProfile.savePicture.mockRejectedValueOnce(new Error())
    expect.assertions(1)
    const promise = sut({ id: 'any-id', file: undefined })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalledTimes(1)
    })
  })

  it('should rethrows when SaveUserPicture throws', async () => {
    const error = new Error('save-error')
    userProfile.savePicture.mockRejectedValueOnce(error)

    const promise = sut({ id: 'any-id', file: undefined })

    await expect(promise).rejects.toThrow(error)
  })
})
