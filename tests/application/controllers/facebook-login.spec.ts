import { FacebookLoginController } from '@/application/controllers'
import { UnauthorizationError } from '@/application/erros'
import { RequiredStringValidator } from '@/application/validation'

describe('FacebookLoginController', () => {
  let facebookAuth: jest.Mock
  let sut: FacebookLoginController
  let token: string

  beforeAll(() => {
    token = 'any-token'
    facebookAuth = jest.fn()
    facebookAuth.mockResolvedValue({ accessToken: 'any-value' })
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

    expect(facebookAuth).toHaveBeenCalledWith({ token })
    expect(facebookAuth).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.mockRejectedValueOnce(new UnauthorizationError())
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
