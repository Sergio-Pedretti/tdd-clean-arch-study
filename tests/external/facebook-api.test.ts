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

    const fbUser = await sut.loadUser({ token: 'EAAHuxvdal4YBALrKNUoM6taEts53lr2FXqb2ZCnu80Mo8CEeaa1EhkeQwZB3ZC4NE7aGIZCp0zJDhKc2dtUITJyLZB2G6NzscoZCPj5zIiOjLW9wLlUq0T3d2nik2ZBYZA92AX3ZA9VbsjeU8Wd4fC4j3R84AsZAhlAyLH67qIZCsTzUcBopJTJizHMlDYB1CdfgROyvyXcpS4C1gPj2LsZC76Df' })

    expect(fbUser).toEqual({
      facebookId: '108045588794906',
      name: 'Sergio Teste',
      email: 'sergio_wzwvtot_teste@tfbnw.net'
    })
  })
})
