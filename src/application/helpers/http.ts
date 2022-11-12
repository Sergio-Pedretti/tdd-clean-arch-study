import { UnauthorizationError } from '@/application/erros'

export type HttpResponse = {
  statusCode: number
  data: any
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  data: new UnauthorizationError()
})