import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/erros'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Setup = (
  facebookApi: LoadFacebookUserApi,
  userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
  crypto: TokenGenerator
) => FacebookAuthentication

export type FacebookAuthentication = (params: { token: string }) => Promise<{ accessToken: string }>

export const setupFacebookAuthentication: Setup = (
  facebookApi,
  userAccountRepo,
  crypto
): FacebookAuthentication => {
  return async params => {
    const fbData = await facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const userData = await userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, userData)
      const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
      const accessToken = await crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return { accessToken }
    }
    throw new AuthenticationError()
  }
}
