import { AwsS3FileStorage } from '@/infra/upload'
import { env } from '@/main/config/env'
import axios from 'axios'

describe('AWS S3 Integration Test', () => {
  let sut: AwsS3FileStorage
  jest.setTimeout(10000)

  beforeAll(() => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey,
      env.s3.secret,
      env.s3.bucket
    )
  })

  it('should upload and delete image to amazon s3', async () => {
    const key = 'any-key.png'
    const onePixelImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2MIZ836DwADQwHGbHBwIgAAAABJRU5ErkJggg=='
    const file = Buffer.from(onePixelImageBase64, 'base64')

    const pictureUrl = await sut.upload({ key, file })

    expect((await axios.get(pictureUrl)).status).toBe(200)

    await sut.delete({ key })

    await expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
