import { ChangeProfilePicture } from '@/domain/use-cases'

type httpRequest = { userId: string }

export class DeleteProfilePictureController {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ userId }: httpRequest): Promise<void> {
    await this.changeProfilePicture({ id: userId })
  }
}

describe('DeleteProfilePictureController', () => {
  it('should call ChangeProfilePicture with correct inputs', async () => {
    const changeProfilePicture = jest.fn()
    const sut = new DeleteProfilePictureController(changeProfilePicture)

    await sut.handle({ userId: 'any-user-id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: 'any-user-id' })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })
})
