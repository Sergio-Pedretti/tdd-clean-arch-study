import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { mock, MockProxy } from 'jest-mock-extended'

class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (
    private readonly httpClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string

  ) {}

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client-credentials'
      }
    })
  }
}

interface HttpGetClient {
  get: (url: HttpGetClient.Params) => Promise<void>
}

namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}

describe('Facebook API', () => {
  let clientId: string
  let clientSecret: string
  let httpClient: MockProxy<HttpGetClient>
  let sut: FacebookApi

  beforeAll(() => {
    clientId = 'client-id'
    clientSecret = 'client-secret'
    httpClient = mock()
  })

  beforeEach(() => {
    sut = new FacebookApi(httpClient, clientId, clientSecret)
  })

  it('should get app token', async () => {
    await sut.loadUser({ token: 'any-client-token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client-credentials'
      }
    })
  })
})
