import { ChangeProfilePicture } from '@/domain/use-cases'
import { HttpResponse, noContent } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type httpRequest = { userId: string }

export class DeleteProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform ({ userId }: httpRequest): Promise<HttpResponse> {
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
