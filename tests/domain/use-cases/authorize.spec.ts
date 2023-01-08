import { mock, MockProxy } from 'jest-mock-extended'
import { TokenValidator } from '@/domain/contracts/crypto'
import { Authorize, setupAuthorize } from '@/domain/use-cases'

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
