import { HttpResponse } from '@/application/helpers'

export interface Middleware {
  handle: (HttpRequest: any) => Promise<HttpResponse>
}
