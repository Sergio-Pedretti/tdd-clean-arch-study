import { RequiredField } from '@/application/erros'
import { HttpResponse, badRequest } from '@/application/helpers'

type HttpRequest = { file: { buffer: Buffer, mimeType: string } }
type Model = Error

export class SavePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model> | undefined> {
    if (file === undefined || file === null) return badRequest(new RequiredField('file'))
    if (file.buffer.length === 0) return badRequest(new RequiredField('file'))
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimeType)) return badRequest(new InvalidMimeTypeError(['jpeg', 'png', 'jpg']))
    if (file.buffer.length > 5 * 1024 * 1024) return badRequest(new MaxFileSizeError(5))
  }
}

class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported type. Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMymeTypeError'
  }
}

class MaxFileSizeError extends Error {
  constructor (maxSizeInMB: number) {
    super(`File upload limit is ${maxSizeInMB}MB`)
    this.name = 'MaxFileSizeError'
  }
}

describe('SavePictureController', () => {
  let sut: SavePictureController
  let buffer: Buffer
  let mimeType: string

  beforeAll(() => {
    buffer = Buffer.from('any-buffer')
    mimeType = 'image/png'
  })

  beforeEach(() => {
    sut = new SavePictureController()
  })

  it('should return 400 if file its not provided', async () => {
    const httpResponse = await sut.handle({ file: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredField('file')
    })
  })

  it('should return 400 if file its not provided', async () => {
    const httpResponse = await sut.handle({ file: null as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredField('file')
    })
  })

  it('should return 400 if file is empty', async () => {
    const httpResponse = await sut.handle({ file: { buffer: Buffer.from(''), mimeType } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredField('file')
    })
  })

  it('should return 400 if file type is invalid', async () => {
    const httpResponse = await sut.handle({ file: { buffer, mimeType: 'invalid_mime' } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['jpeg', 'png', 'jpg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpResponse = await sut.handle({ file: { buffer, mimeType: 'image/png' } })

    expect(httpResponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['jpeg', 'png', 'jpg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpResponse = await sut.handle({ file: { buffer, mimeType: 'image/jpeg' } })

    expect(httpResponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['jpeg', 'png', 'jpg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpResponse = await sut.handle({ file: { buffer, mimeType: 'image/jpg' } })

    expect(httpResponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['jpeg', 'png', 'jpg'])
    })
  })

  it('should return 400 if file size is bigger than 5MB', async () => {
    const invalidBuffer = Buffer.from(new ArrayBuffer(6 * 1024 * 1024))
    const httpResponse = await sut.handle({ file: { buffer: invalidBuffer, mimeType } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new MaxFileSizeError(5)
    })
  })
})
