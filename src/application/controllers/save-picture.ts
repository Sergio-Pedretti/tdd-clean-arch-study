import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { RequiredField, MaxFileSizeError, InvalidMimeTypeError } from '@/application/erros'
import { ChangeProfilePicture } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    if (file === undefined || file === null) return badRequest(new RequiredField('file'))
    if (file.buffer.length === 0) return badRequest(new RequiredField('file'))
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimeType)) return badRequest(new InvalidMimeTypeError(['jpeg', 'png', 'jpg']))
    if (file.buffer.length > 5 * 1024 * 1024) return badRequest(new MaxFileSizeError(5))

    const data = await this.changeProfilePicture({ id: userId, file: file.buffer })

    return ok(data)
  }
}
