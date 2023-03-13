import { InvalidMimeTypeError } from '@/application/erros'

type Extension = 'png' | 'jpg' | 'jpeg'

class AllowedMimeTypes {
  constructor (private readonly allowed: Extension[], private readonly mimeType: string) {}

  validate (): Error | undefined {
    if (this.isJPEG()) return
    if (this.isJPG()) return
    if (this.isPNG()) return

    return new InvalidMimeTypeError(this.allowed)
  }

  private isJPEG (): boolean {
    return this.mimeType === 'image/jpeg' && this.allowed.includes('jpeg')
  }

  private isJPG (): boolean {
    return this.mimeType === 'image/jpg' && this.allowed.includes('jpg')
  }

  private isPNG (): boolean {
    return this.mimeType === 'image/png' && this.allowed.includes('png')
  }
}

describe('AllowedMimeTypes', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/png')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypes(['jpg'], 'image/jpg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypes(['jpeg'], 'image/jpeg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
