export interface HttpGetClient {
  get: (url: HttpGetClient.Params) => Promise<void>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}
