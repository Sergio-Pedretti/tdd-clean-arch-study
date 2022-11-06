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
    httpClient.get.mockResolvedValueOnce({ access_token: 'any-app-token' })
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

  it('should get debug token', async () => {
    await sut.loadUser({ token: 'any-client-token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/debug_token',
      params: {
        access_token: 'any-app-token',
        input_token: 'any-client-token'
      }
    })
  })
})
