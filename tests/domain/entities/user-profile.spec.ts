import { UserProfile } from '@/domain/entities'

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any-id')
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any-url', name: 'any-name' })

    expect(sut).toEqual({
      id: 'any-id',
      pictureUrl: 'any-url',
      initials: undefined
    })
  })

  it('should create with empty initials when pictureUrl is provided and name is not provided', () => {
    sut.setPicture({ pictureUrl: 'any-url' })

    expect(sut).toEqual({
      id: 'any-id',
      pictureUrl: 'any-url',
      initials: undefined
    })
  })

  it('should create initials with first letter first name and first letter last name', () => {
    sut.setPicture({ name: 'sergio italo miranda pedretti' })

    expect(sut).toEqual({
      id: 'any-id',
      pictureUrl: undefined,
      initials: 'SP'
    })
  })

  it('should create initials with first and second letter', () => {
    sut.setPicture({ name: 'sergio' })

    expect(sut).toEqual({
      id: 'any-id',
      pictureUrl: undefined,
      initials: 'SE'
    })
  })

  it('should create initials with unique letter', () => {
    sut.setPicture({ name: 's' })

    expect(sut).toEqual({
      id: 'any-id',
      pictureUrl: undefined,
      initials: 'S'
    })
  })

  it('should create with empty initials when neither name nor picture are provided', () => {
    sut.setPicture({})

    expect(sut).toEqual({
      id: 'any-id',
      pictureUrl: undefined,
      initials: undefined
    })
  })
})
