import { Controller, DeleteProfilePictureController } from '@/application/controllers'

describe('DeleteProfilePictureController', () => {
  let changeProfilePicture: jest.Mock
  let sut: DeleteProfilePictureController

  beforeAll(() => {
    changeProfilePicture = jest.fn()
  })
  beforeEach(() => {
    sut = new DeleteProfilePictureController(changeProfilePicture)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call ChangeProfilePicture with correct inputs', async () => {
    await sut.perform({ userId: 'any-user-id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: 'any-user-id' })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 204', async () => {
    const httpResponse = await sut.perform({ userId: 'any-user-id' })

    expect(httpResponse).toEqual({ statusCode: 204, data: null })
  })
})
