import { AccessToken } from '@/domain/models'
import { FacebookAuthentication } from '@/domain/features'
import { HttpResponse, badRequest, unauthorized, serverError } from '@/application/helpers'
import { RequiredField } from '@/application/erros'

export class FacebookLoginController {
  constructor (private readonly facebookAuth: FacebookAuthentication) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === undefined || httpRequest.token === null) {
        return badRequest(new RequiredField('token'))
      }
      const accessToken = await this.facebookAuth.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return {
          statusCode: 200,
          data: { access_token: accessToken.value }
        }
      }
      return unauthorized()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
