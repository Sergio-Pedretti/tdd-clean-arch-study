import { InvalidMimeTypeError } from '@/application/erros'

class AllowedMimeTypes {
  constructor (private readonly allowedTypes: string[], private readonly mimeType: string) {}

  validate (): Error {
    return new InvalidMimeTypeError(this.allowedTypes)
  }
}

describe('AllowedMimeTypes', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypes(['png'], 'images/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })
})
