import { AuthenticationError } from '@/domain/erros'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { TokenGenerator } from '@/data/contracts/crypto'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication'

import { mocked } from 'ts-jest/utils'

import { mock, MockProxy } from 'jest-mock-extended'
import { AccessToken, FacebookAccount } from '@/domain/models/'

jest.mock('@/domain/models/facebook-account')

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>

  let sut: FacebookAuthenticationService
  const token = 'any-token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      facebookId: 'any-fb-id',
      name: 'any-fb-name',
      email: 'any-fb-email'
    })

    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithFacebook.mockResolvedValueOnce({ id: 'any-account-id' })
    crypto = mock()
    crypto.generateToken.mockResolvedValue('any-generated-token')
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })

  it('should call loadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return Authentication Error when loadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepository when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any-fb-email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
    const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(FacebookAccount).mockImplementation(FacebookAccountStub)

    await sut.perform({ token })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
      any: 'any'
    })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should call TokenGenerator with correct params ', async () => {
    await sut.perform({ token })

    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any-account-id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  it('should return an AuthToken on success ', async () => {
    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AccessToken('any-generated-token'))
  })
})
