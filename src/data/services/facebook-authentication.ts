import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, CreateFacebookAccountRepository, UpdateFacebookAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/erros'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository

  ) {

  }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const userData = await this.userAccountRepo.load({ email: fbData.email })
      if (userData !== undefined) {
        await this.userAccountRepo.updateWithFacebook({
          id: userData.id,
          name: userData.name ?? fbData.name,
          facebookId: fbData.facebookId
        })
      } else {
        await this.userAccountRepo.createFromFacebook(fbData)
      }
    }
    return new AuthenticationError()
  }
}