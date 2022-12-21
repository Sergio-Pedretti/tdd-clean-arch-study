export interface LoadFacebookUserApi {
  loadUser: (token: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  type facebookLogIn = {
    facebookId: string
    name: string
    email: string
  }
  export type Result = facebookLogIn | undefined
}
