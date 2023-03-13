import { InvalidMimeTypeError } from '@/application/erros'

type Extension = 'png' | 'jpg' | 'jpeg'

export class AllowedMimeTypes {
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
