import { mock, MockProxy } from 'jest-mock-extended'

interface Validator {
  validate: () => Error | undefined
}

class ValidationComposite {
  constructor (private readonly validators: Validator[]) {}

  validate (): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate()
      if (error !== undefined) {
        return error
      }
    }
    return undefined
  }
}

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let validator1: MockProxy<Validator>
  let validator2: MockProxy<Validator>
  let validators: Validator[]

  beforeEach(() => {
    validator1 = mock()
    validator1.validate.mockReturnValue(undefined)
    validator2 = mock()
    validator2.validate.mockReturnValue(undefined)
    validators = [validator1, validator2]
    sut = new ValidationComposite(validators)
  })

  it('should return undefined when all validators return undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return the first error', () => {
    validator1.validate.mockReturnValueOnce(new Error('error-1'))
    validator2.validate.mockReturnValueOnce(new Error('error-2'))

    const error = sut.validate()

    expect(error).toEqual(new Error('error-1'))
  })

  it('should return an error in list', () => {
    validator2.validate.mockReturnValueOnce(new Error('error-2'))

    const error = sut.validate()

    expect(error).toEqual(new Error('error-2'))
  })
})
