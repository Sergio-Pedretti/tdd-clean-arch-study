import { FacebookAuthentication } from '@/domain/features'
import { FacebookLoginController } from '@/application/controllers'
import { ServerError, UnauthorizationError } from '@/application/erros'
import { AccessToken } from '@/domain/models'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookLoginController', () => {
  let facebookAuth: MockProxy<FacebookAuthentication>
  let sut: FacebookLoginController

  beforeAll(() => {
    facebookAuth = mock()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any-value'))
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should return 400 if token is empty', async () => {
    const httpResponse = await sut.handle({ token: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is null', async () => {
    const httpResponse = await sut.handle({ token: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    const httpResponse = await sut.handle({ token: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should call FacebookAuthentication with corrects params', async () => {
    await sut.handle({ token: 'any-token' })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token: 'any-token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new UnauthorizationError())
    const httpResponse = await sut.handle({ token: 'any-token' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizationError()
    })
  })

  it('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ token: 'any-token' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        access_token: 'any-value'
      }
    })
  })

  it('should return 500 if authentication throws', async () => {
    const error = new Error('infra-error')
    facebookAuth.perform.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({ token: 'any-token' })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})