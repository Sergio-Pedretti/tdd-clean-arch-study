import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get (args: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(args.url, { params: args.params })
    return result.data
  }
}

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object

  beforeAll(() => {
    url = 'any-url'
    params = {
      any: 'any'
    }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: 'any-data'
    })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('Get', () => {
    it('should call get with correct params', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })

  it('should return data on success', async () => {
    const result = await sut.get({ url, params })

    expect(result).toEqual('any-data')
  })

  it('should rethrow if axios throws', async () => {
    fakeAxios.get.mockRejectedValueOnce(new Error('http-error'))

    const promise = sut.get({ url, params })

    await expect(promise).rejects.toThrow(new Error('http-error'))
  })
})
