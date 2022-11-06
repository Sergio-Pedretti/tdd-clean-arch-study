import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get (args: HttpGetClient.Params): Promise<void> {
    await axios.get(args.url, { params: args.params })
  }
}

describe('AxiosHttpClient', () => {
  describe('Get', () => {
    it('should call get with correct params', async () => {
      const fakeAxios = axios as jest.Mocked<typeof axios>
      const sut = new AxiosHttpClient()

      await sut.get({
        url: 'any-url',
        params: {
          any: 'any'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith('any-url', {
        params: {
          any: 'any'
        }
      })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
