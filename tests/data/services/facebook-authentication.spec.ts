import { AuthenticationError } from '@/domain/erros'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: FacebookAuthenticationService
  LoadFacebookUserApi: MockProxy<LoadFacebookUserApi>
}

const makeSut = (): SutTypes => {
  const LoadFacebookUserApi = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationService(LoadFacebookUserApi)
  return {
    sut,
    LoadFacebookUserApi
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const { sut, LoadFacebookUserApi } = makeSut()
    await sut.perform({ token: 'any-token' })

    expect(LoadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any-token' })
    expect(LoadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return Authentication Error when loadFacebookUserApi returns undefined', async () => {
    const LoadFacebookUserApi = mock<LoadFacebookUserApi>()
    LoadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any-token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
