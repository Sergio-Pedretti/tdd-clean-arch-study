import { FacebookApi } from '@/infra/apis'
import { HttpGetClient } from '@/infra/http'

import { mock, MockProxy } from 'jest-mock-extended'

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
