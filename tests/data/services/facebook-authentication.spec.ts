import { AuthenticationError } from '@/domain/erros'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & CreateFacebookAccountRepository>

  let sut: FacebookAuthenticationService
  const token = 'any-token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      facebookId: 'any-fb-id',
      name: 'any-name',
      email: 'any-fb-email'
    })

    userAccountRepo = mock()
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo
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

  it('should call CreateUserAccountRepository when LoadUserAccountRepository returns undefined', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)

    await sut.perform({ token })

    expect(userAccountRepo.createFromFacebook).toHaveBeenCalledWith({ email: 'any-fb-email', name: 'any-name', facebookId: 'any-fb-id' })
    expect(userAccountRepo.createFromFacebook).toHaveBeenCalledTimes(1)
  })
})
