import { JwtTokenGenerator } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

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

  it('should rethrows if sign throws', async () => {
    fakeJwt.sign.mockImplementationOnce(() => { throw new Error('jwt-error') })

    const promise = sut.generateToken({
      key: 'any-key',
      expirationInMs: 1000
    })

    await expect(promise).rejects.toThrow(new Error('jwt-error'))
  })
})
