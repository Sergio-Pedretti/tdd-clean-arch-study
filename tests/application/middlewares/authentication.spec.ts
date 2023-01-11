import { forbidden, HttpResponse } from '@/application/helpers'
import { ForbiddenError } from '@/application/erros'
import { RequiredStringValidator } from '@/application/validation'
import { Authorize } from '@/domain/use-cases'

type HttpRequest = { authorization: string }

class AuthenticationMiddleware {
  constructor (private readonly authorize: Authorize) {}
  async handle (httpResponse: HttpRequest): Promise<HttpResponse<Error> | undefined> {
    const { authorization } = httpResponse
    const error = new RequiredStringValidator(authorization, 'authorization').validate()
    if (error !== undefined) return forbidden()
    await this.authorize({ token: authorization })
  }
}

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let authorize: jest.Mock
  let authorization: string

  beforeAll(() => {
    authorization = 'any-authorization-token'
    authorize = jest.fn()
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize)
  })

  it('should return 403 if authorization is empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization is null', async () => {
    const httpResponse = await sut.handle({ authorization: null as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization is undefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should call authorize with corret paramz', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ token: authorization })
    expect(authorize).toHaveBeenCalledTimes(1)
  })
})
