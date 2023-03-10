import { ChangeProfilePicture } from '@/domain/use-cases'
import { HttpResponse, noContent } from '@/application/helpers'

type httpRequest = { userId: string }

export class DeleteProfilePictureController {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ userId }: httpRequest): Promise<HttpResponse> {
    await this.changeProfilePicture({ id: userId })
    return noContent()
  }
}

describe('DeleteProfilePictureController', () => {
  let changeProfilePicture: jest.Mock
  let sut: DeleteProfilePictureController

  beforeAll(() => {
    changeProfilePicture = jest.fn()
  })
  beforeEach(() => {
    sut = new DeleteProfilePictureController(changeProfilePicture)
  })

  it('should call ChangeProfilePicture with correct inputs', async () => {
    await sut.handle({ userId: 'any-user-id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: 'any-user-id' })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 204', async () => {
    const httpResponse = await sut.handle({ userId: 'any-user-id' })

    expect(httpResponse).toEqual({ statusCode: 204, data: null })
  })
})
