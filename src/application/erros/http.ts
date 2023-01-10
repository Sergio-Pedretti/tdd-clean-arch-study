export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredField extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is required`)
    this.name = 'RequiredField'
  }
}

export class UnauthorizationError extends Error {
  constructor () {
    super('Unautorized')
    this.name = 'UnauthorizationError'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Forbidden')
    this.name = 'ForbiddenError'
  }
}
