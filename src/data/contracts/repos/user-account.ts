export interface LoadUserAccountRepository {
  load: (email: LoadUserAccountRepository.Params) => Promise<void>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }
}
