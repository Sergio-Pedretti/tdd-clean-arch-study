import { AllowedMimeTypes, MaxFileSize, Required, RequiredBuffer } from '@/application/validation'
import { SavePictureController, Controller } from '@/application/controllers'

describe('SavePictureController', () => {
  let sut: SavePictureController
  let buffer: Buffer
  let mimeType: string
  let userId: string
  let file: { buffer: Buffer, mimeType: string }
  let changeProfilePicture: jest.Mock

  beforeAll(() => {
    buffer = Buffer.from('any-buffer')
    mimeType = 'image/png'
    file = { buffer, mimeType }
    userId = 'any-user-id'
    changeProfilePicture = jest.fn().mockResolvedValue({ initials: 'any-initials', pictureUrl: 'any-url' })
  })

  beforeEach(() => {
    sut = new SavePictureController(changeProfilePicture)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ file, userId })

    expect(validators).toEqual([
      new Required(file, 'file'),
      new RequiredBuffer(buffer, 'file'),
      new AllowedMimeTypes(['png', 'jpeg', 'jpg'], mimeType),
      new MaxFileSize(5, buffer)
    ])
  })

  it('should call ChangeProfilePicture with correct inputs', async () => {
    await sut.handle({ file, userId })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: userId, file })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ file, userId })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { initials: 'any-initials', pictureUrl: 'any-url' }
    })
  })
})
