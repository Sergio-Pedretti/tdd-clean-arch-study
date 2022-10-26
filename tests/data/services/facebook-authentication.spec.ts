import { AuthenticationError } from '@/domain/erros'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>
  let createFacebookAccountRepository: MockProxy<CreateFacebookAccountRepository>

  let sut: FacebookAuthenticationService
  const token = 'any-token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadFacebookUserApi.loadUser.mockResolvedValue({
      facebookId: 'any-fb-id',
      name: 'any-name',
      email: 'any-fb-email'
    })

    loadUserAccountRepo = mock()
    createFacebookAccountRepository = mock()
    sut = new FacebookAuthenticationService(
      loadFacebookUserApi,
      loadUserAccountRepo,
      createFacebookAccountRepository
    )
  })

  it('should call loadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return Authentication Error when loadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepository when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any-fb-email' })
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call CreateUserAccountRepository when LoadUserAccountRepository returns undefined', async () => {
    loadUserAccountRepo.load.mockResolvedValueOnce(undefined)

    await sut.perform({ token })

    expect(createFacebookAccountRepository.createFromFacebook).toHaveBeenCalledWith({ email: 'any-fb-email', name: 'any-name', facebookId: 'any-fb-id' })
    expect(createFacebookAccountRepository.createFromFacebook).toHaveBeenCalledTimes(1)
  })
})
