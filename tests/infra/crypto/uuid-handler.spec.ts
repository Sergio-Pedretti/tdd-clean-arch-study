import { UUIDGenerator } from '@/domain/contracts/crypto'
import { v4 } from 'uuid'

jest.mock('uuid')

export class UUIDHandler {
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return `${key}-${v4()}`
  }
}

describe('UUIDHandler', () => {
  let sut: UUIDHandler
  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should call uuid.v4', () => {
    sut.uuid({ key: 'any-key' })

    expect(v4).toHaveBeenCalledTimes(1)
  })
})
