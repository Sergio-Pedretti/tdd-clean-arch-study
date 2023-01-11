import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('', () => {
  it('should return a facebook user if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: env.facebookApi.fbToken })

    expect(fbUser).toEqual({
      facebookId: '108045588794906',
      name: 'Sergio Teste',
      email: 'sergio_wzwvtot_teste@tfbnw.net'
    })
  })
})
