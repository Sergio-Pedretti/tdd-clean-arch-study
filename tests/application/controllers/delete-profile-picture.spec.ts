import { ChangeProfilePicture } from '@/domain/use-cases'

type httpRequest = { userId: string }

export class DeleteProfilePictureController {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ userId }: httpRequest): Promise<void> {
    await this.changeProfilePicture({ id: userId })
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
})
