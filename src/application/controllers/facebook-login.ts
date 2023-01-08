import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { FacebookAuthentication } from '@/domain/use-cases'

type HttpRequest = {
  token: string
}

type Model = Error | { accessToken: string }

export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuth: FacebookAuthentication) {
    super()
  }

  async perform ({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.facebookAuth({ token })
      return ok(accessToken)
    } catch {
      return unauthorized()
    }
  }

  override buildValidators ({ token }: HttpRequest): Validator[] {
    return [...Builder
      .of({ value: token, fieldName: 'token' })
      .required()
      .build()]
  }
}
