import { ServerError, UnauthorizationError } from '@/application/erros'

export type HttpResponse = {
  statusCode: number
  data: any
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  data: new UnauthorizationError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: new ServerError(error)
})
