import { Required, RequiredBuffer, RequiredStringValidator, ValidationBuilder } from '@/application/validation'

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

  it('should return Required', () => {
    const buffer = Buffer.from('any-buffer')
    const validators = ValidationBuilder
      .of({
        value: { buffer }
      })
      .required()
      .build()

    expect(validators).toEqual([new Required({ buffer }), new RequiredBuffer(buffer)])
  })
})
