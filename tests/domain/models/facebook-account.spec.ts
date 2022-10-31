import { FacebookAccount } from '@/domain/models'

describe('FacebookAccount', () => {
  const fbData = {
    name: 'any-fb-name',
    email: 'any-fb-email',
    facebookId: 'any-fb-facebookId'
  }
  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual(fbData)
  })

  it('should update name if its empty', () => {
    const accountData = { id: 'any-id' }

    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any-id',
      name: 'any-fb-name',
      email: 'any-fb-email',
      facebookId: 'any-fb-facebookId'
    })
  })

  it('should not update name if its name not empty', () => {
    const accountData = { id: 'any-id', name: 'any-name' }

    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any-id',
      name: 'any-name',
      email: 'any-fb-email',
      facebookId: 'any-fb-facebookId'
    })
  })
})
