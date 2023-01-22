import { config } from 'aws-sdk'

jest.mock('aws-sdk')

class AwsS3FileStorage {
  constructor (private readonly accessKey: string, private readonly secret: string) {
    config.update({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
  }
}

describe('AwsS3FileStorage', () => {
  let accessKey: string
  let secret: string

  let sut: AwsS3FileStorage
  beforeAll(() => {
    accessKey = 'any-key'
    secret = 'any-secret'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKey, secret)
  })

  it('should config AWS credentials on creation', () => {
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
    expect(config.update).toHaveBeenCalledTimes(1)
    expect(sut).toBeDefined()
  })
})
