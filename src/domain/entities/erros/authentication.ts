export class AuthenticationError extends Error {
  constructor () {
    super('Auth Failed')
    this.name = 'AuthenticationError'
  }
}
