import { RequiredField } from '@/application/erros'
import { RequiredString } from '@/application/validation'

describe('RequiredString', () => {
  it('should return error if value is empty', () => {
    const sut = new RequiredString('', 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return error if value is null', () => {
    const sut = new RequiredString(null as any, 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return error if value is undefined', () => {
    const sut = new RequiredString(undefined as any, 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return undefined if value is defined', () => {
    const sut = new RequiredString('any-value', 'any-field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
