import { UUIDGenerator } from '@/domain/contracts/crypto'

class UniqueId {
  constructor (private readonly date: Date) {}
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return key +
    '-' +
    this.date.getFullYear().toString() +
    (this.date.getMonth() + 1).toString().padStart(2, '0') +
    this.date.getDate().toString().padStart(2, '0') +
    this.date.getHours().toString().padStart(2, '0') +
    this.date.getMinutes().toString().padStart(2, '0') +
    this.date.getSeconds().toString().padStart(2, '0')
  }
}

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
