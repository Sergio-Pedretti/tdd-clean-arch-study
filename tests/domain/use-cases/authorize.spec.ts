import { mock, MockProxy } from 'jest-mock-extended'

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<TokenValidator.Result>
}

export namespace TokenValidator {
  export type Params = {
    token: string
  }
  export type Result = string
}

type Setup = (crypto: TokenValidator) => Authorize
type Input = { token: string }
type Output = string
type Authorize = (params: Input) => Promise<Output>

const setupAuthorize: Setup = crypto => async params => {
  return await crypto.validateToken(params)
}

describe('TokenValidator', () => {
  let crypto: MockProxy<TokenValidator>
  let sut: Authorize
  let token: string

  beforeAll(() => {
    token = 'any-token'
    crypto = mock()
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
    crypto.validateToken.mockResolvedValue('any-value')
  })

  it('should call TokenValidator with correct params', async () => {
    await sut({ token })

    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })

  it('should return correct AccessToken', async () => {
    const userId = await sut({ token })

    expect(userId).toBe('any-value')
  })
})
