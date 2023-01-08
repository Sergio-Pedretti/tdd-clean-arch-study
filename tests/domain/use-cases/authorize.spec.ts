import { mock, MockProxy } from 'jest-mock-extended'

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<Authorize>
}

export namespace TokenValidator {
  export type Params = {
    token: string
  }
}

type Setup = (crypto: TokenValidator) => Authorize
type Input = { token: string }
type Authorize = (params: Input) => Promise<void>

const setupAuthorize: Setup = crypto => async params => {
  await crypto.validateToken(params)
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
  })

  it('should call TokenValidator with correct params', async () => {
    await sut({ token })

    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })
})