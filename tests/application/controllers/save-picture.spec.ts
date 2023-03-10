import { RequiredField } from '@/application/erros'
import { HttpResponse, badRequest } from '@/application/helpers'

type HttpRequest = { file: any }
type Model = Error

export class SavePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    return badRequest(new RequiredField('file'))
  }
}

describe('SavePictureController', () => {
  let sut: SavePictureController

  beforeEach(() => {
    sut = new SavePictureController()
  })

  it('should return 400 if file its not provided', async () => {
    const httpResponse = await sut.handle({ file: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredField('file')
    })
  })

  it('should return 400 if file its not provided', async () => {
    const httpResponse = await sut.handle({ file: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredField('file')
    })
  })
})
