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

    const fbUser = await sut.loadUser({ token: 'EAAHuxvdal4YBAMKDWDb7KGWrGSmZA0P7xThAnM77oZA04mYVwTG9Tbbz0omssAAHaC8pJ2U3ONW9ABzjvfd9C0Lp6fzLk2JeBmoqKe6FRiMOA651z2ZCSQexOiERHZBbXNfQjW1hvkC1HBOTQrHw4DlVLuL3GZBas2JiQxtfZA8YjNILeZCk4ZAGCg750AfQOcAlBpF3AppOF5b8c9R2PMyZC' })

    expect(fbUser).toEqual({
      facebookId: '108045588794906',
      name: 'Sergio Teste',
      email: 'sergio_wzwvtot_teste@tfbnw.net'
    })
  })
})
