import { FacebookAuthentication } from '@/domain/features'
import { FacebookLoginController } from '@/application/controllers'
import { UnauthorizationError } from '@/application/erros'
import { AccessToken } from '@/domain/entities'
import { mock, MockProxy } from 'jest-mock-extended'
import { RequiredStringValidator } from '@/application/validation'

describe('FacebookLoginController', () => {
  let facebookAuth: MockProxy<FacebookAuthentication>
  let sut: FacebookLoginController
  let token: string

  beforeAll(() => {
    token = 'any-token'
    facebookAuth = mock()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any-value'))
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should build validators correctely', async () => {
    const validators = sut.buildValidators({ token })

    expect(validators).toEqual([new RequiredStringValidator('any-token', 'token')])
  })

  it('should call FacebookAuthentication with corrects params', async () => {
    await sut.handle({ token })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new UnauthorizationError())
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizationError()
    })
  })

  it('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any-value'
      }
    })
  })
})
