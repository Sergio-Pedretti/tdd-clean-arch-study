import { HttpResponse, ok } from '@/application/helpers'
import { ChangeProfilePicture } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { Validator, AllowedMimeTypes, MaxFileSize, Required, RequiredBuffer } from '@/application/validation'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ id: userId, file: file.buffer })

    return ok(data)
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    return [new Required(file, 'file'),
      new RequiredBuffer(file.buffer, 'file'),
      new AllowedMimeTypes(['png', 'jpeg', 'jpg'], file.mimeType),
      new MaxFileSize(5, file.buffer)]
  }
}
