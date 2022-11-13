import { RequiredField } from '@/application/erros'
import { RequiredStringValidator } from '@/application/validation'

describe('RequiredStringValidator', () => {
  it('should return error if value is empty', () => {
    const sut = new RequiredStringValidator('', 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return error if value is null', () => {
    const sut = new RequiredStringValidator(null as any, 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return error if value is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return undefined if value is defined', () => {
    const sut = new RequiredStringValidator('any-value', 'any-field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
