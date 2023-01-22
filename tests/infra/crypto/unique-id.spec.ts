import { UniqueId } from '@/infra/crypto'

describe('UniqueId', () => {
  it('should call unique uuid', () => {
    const sut = new UniqueId(new Date(2022, 1, 12, 18, 35, 22))

    const uuid = sut.uuid({ key: 'any-key' })

    expect(uuid).toBe('any-key-20220212183522')
  })

  it('should call unique uuid', () => {
    const sut = new UniqueId(new Date(2022, 4, 12, 9, 0, 1))

    const uuid = sut.uuid({ key: 'any-key' })

    expect(uuid).toBe('any-key-20220512090001')
  })
})
