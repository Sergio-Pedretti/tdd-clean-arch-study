import { AllowedMimeTypes, MaxFileSize, Required, RequiredBuffer, RequiredStringValidator, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder
      .of({
        value: 'any-value'
      })
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any-value')])
  })

  it('should return a RequiredBuffer', () => {
    const buffer = Buffer.from('any-buffer')
    const validators = ValidationBuilder
      .of({
        value: buffer
      })
      .required()
      .build()

    expect(validators).toEqual([new RequiredBuffer(buffer)])
  })

  it('should return Required', () => {
    const validators = ValidationBuilder
      .of({
        value: { any: 'any' }
      })
      .required()
      .build()

    expect(validators).toEqual([new Required({ any: 'any' })])
  })

  it('should return Required and RequiredBuffer', () => {
    const buffer = Buffer.from('any-buffer')
    const validators = ValidationBuilder
      .of({
        value: { buffer }
      })
      .required()
      .build()

    expect(validators).toEqual([new Required({ buffer }), new RequiredBuffer(buffer)])
  })

  it('should return Image validators', () => {
    const buffer = Buffer.from('any-buffer')
    const validators = ValidationBuilder
      .of({
        value: { buffer }
      })
      .image({ allowed: ['png'], maxSizeInMB: 6 })
      .build()

    expect(validators).toEqual([
      new MaxFileSize(6, buffer)
    ])
  })

  it('should return Image validators', () => {
    const validators = ValidationBuilder
      .of({
        value: { mimeType: 'image/png' }
      })
      .image({ allowed: ['png'], maxSizeInMB: 6 })
      .build()

    expect(validators).toEqual([
      new AllowedMimeTypes(['png'], 'image/png')
    ])
  })
})
