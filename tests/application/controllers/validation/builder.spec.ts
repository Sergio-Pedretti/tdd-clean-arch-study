import { RequiredStringValidator, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder
      .of({
        value: 'any-value',
        fieldName: 'any-name'
      })
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any-value', 'any-name')])
  })
})
