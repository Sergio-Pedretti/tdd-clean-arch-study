import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/erros'
import { FacebookAuthentication } from '@/domain/features'
import { FacebookAccount } from '@/domain/models'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository

  ) {

  }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const userData = await this.userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, userData)
      await this.userAccountRepo.saveWithFacebook(fbAccount)
    }
    return new AuthenticationError()
  }
}
