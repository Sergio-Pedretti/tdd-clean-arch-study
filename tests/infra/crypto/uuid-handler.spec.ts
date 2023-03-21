import { UUIDHandler } from '@/infra/crypto'

import { mocked } from 'ts-jest/utils'
import { v4 } from 'uuid'

jest.mock('uuid')

describe('UUIDHandler', () => {
  let sut: UUIDHandler

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should call uuid.v4', () => {
    sut.uuid({ key: 'any-key' })

    expect(v4).toHaveBeenCalledTimes(1)
  })

  it('should return correct uuid', () => {
    mocked(v4).mockReturnValueOnce('any-uuid')

    const uuid = sut.uuid({ key: 'any-key' })

    expect(uuid).toBe('any-key-any-uuid')
  })
})
