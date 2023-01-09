import { JwtTokenHandler } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
  let secret: string
  let sut: JwtTokenHandler
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeAll(() => {
    secret = 'any-secret'

    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JwtTokenHandler(secret)
  })

  describe('JwtTokenGenerator', () => {
    let key: string
    let token: string
    let expirationInMs: number

    beforeAll(() => {
      key = 'any-key'
      token = 'any-jwt-token'
      expirationInMs = 1000
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call sign with correct params', async () => {
      await sut.generateToken({
        key,
        expirationInMs
      })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
    })

    it('should return a token on success', async () => {
      const result = await sut.generateToken({
        key,
        expirationInMs
      })

      expect(result).toBe(token)
    })

    it('should rethrows if sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('jwt-error') })

      const promise = sut.generateToken({
        key,
        expirationInMs
      })

      await expect(promise).rejects.toThrow(new Error('jwt-error'))
    })
  })

  describe('JwtTokenValidator', () => {

  })
})
