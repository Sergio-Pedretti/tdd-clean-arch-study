import { TokenGenerator } from '@/data/contracts/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JwtTokenGenerator {
  constructor (private readonly secret: string) {

  }

  async generateToken (params: TokenGenerator.Params): Promise<string> {
    const expirationInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

describe('JwtTokenGenerator', () => {
  let sut: JwtTokenGenerator
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => 'any-jwt-token')
  })

  beforeEach(() => {
    sut = new JwtTokenGenerator('any-secret')
  })

  it('should call sign with correct params', async () => {
    await sut.generateToken({
      key: 'any-key',
      expirationInMs: 1000
    })

    expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any-key' }, 'any-secret', { expiresIn: 1 })
  })

  it('should return a token on success', async () => {
    const result = await sut.generateToken({
      key: 'any-key',
      expirationInMs: 1000
    })

    expect(result).toBe('any-jwt-token')
  })
})
