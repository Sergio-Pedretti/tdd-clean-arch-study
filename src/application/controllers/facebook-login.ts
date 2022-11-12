import { AccessToken } from '@/domain/models'
import { FacebookAuthentication } from '@/domain/features'
import { HttpResponse, badRequest } from '@/application/helpers'
import { ServerError, RequiredField } from '@/application/erros'

export class FacebookLoginController {
  constructor (private readonly facebookAuth: FacebookAuthentication) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === undefined || httpRequest.token === null) {
        return badRequest(new RequiredField('token'))
      }
      const result = await this.facebookAuth.perform({ token: httpRequest.token })
      if (result instanceof AccessToken) {
        return {
          statusCode: 200,
          data: { access_token: result.value }
        }
      }
      return {
        statusCode: 401,
        data: result
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: new ServerError(error as Error)
      }
    }
  }
}
