import { RequiredField } from '@/application/erros'
import { Required, RequiredStringValidator, RequiredBuffer } from '@/application/validation'

describe('Required', () => {
  it('should return error if value is null', () => {
    const sut = new Required(null as any, 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return error if value is undefined', () => {
    const sut = new Required(undefined as any, 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return undefined if value is defined', () => {
    const sut = new Required('any-value', 'any-field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredStringValidator', () => {
  it('should extend Required', () => {
    const sut = new RequiredStringValidator('')

    expect(sut).toBeInstanceOf(Required)
  })
  it('should return error if value is empty', () => {
    const sut = new RequiredStringValidator('', 'any-field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredField('any-field'))
  })
  it('should return undefined if value is defined', () => {
    const sut = new RequiredStringValidator('any-value', 'any-field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredBuffer', () => {
  it('should extend Required', () => {
    const sut = new RequiredBuffer(Buffer.from(''))

    expect(sut).toBeInstanceOf(Required)
  })
  it('should return error if value is empty', () => {
    const sut = new RequiredBuffer(Buffer.from(''))

    const error = sut.validate()

    expect(error).toEqual(new RequiredField())
  })
  it('should return undefined if value is defined', () => {
    const sut = new RequiredBuffer(Buffer.from('any-buffer'))

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
