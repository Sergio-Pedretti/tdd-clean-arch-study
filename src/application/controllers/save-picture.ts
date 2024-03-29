import { HttpResponse, ok } from '@/application/helpers'
import { ChangeProfilePicture } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { file?: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const { initials, pictureUrl } = await this.changeProfilePicture({ id: userId, file })

    return ok({ initials, pictureUrl })
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    if (file === undefined) return []
    return [
      ...Builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpeg', 'jpg'], maxSizeInMB: 5 })
        .build()
    ]
  }
}
