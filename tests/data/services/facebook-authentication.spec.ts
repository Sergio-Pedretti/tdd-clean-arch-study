import { AuthenticationError } from '@/domain/erros'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) {

  }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    await sut.perform({ token: 'any-token' })

    expect(LoadFacebookUserApi.token).toBe('any-token')
  })

  it('should return Authentication Error when loadFacebookUserApi returns undefined', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()
    LoadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any-token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
