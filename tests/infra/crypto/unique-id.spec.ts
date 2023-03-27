import { UniqueId } from '@/infra/crypto'

import { set, reset } from 'mockdate'

describe('UniqueId', () => {
  afterEach(() => {
    reset()
  })

  it('should call unique uuid with Date 2022-02-12 18:35:22', () => {
    set(new Date(2022, 1, 12, 18, 35, 22))
    const sut = new UniqueId()

    const uuid = sut.uuid({ key: 'any-key' })

    expect(uuid).toBe('any-key-20220212183522')
  })

  it('should call unique uuid with Date 2022-05-12 09:00:01', () => {
    set(new Date(2022, 4, 12, 9, 0, 1))
    const sut = new UniqueId()

    const uuid = sut.uuid({ key: 'any-key' })

    expect(uuid).toBe('any-key-20220512090001')
  })
})
