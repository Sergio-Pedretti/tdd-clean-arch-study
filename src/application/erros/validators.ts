export class RequiredField extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined ? 'Field required' : `The field ${fieldName} is required`
    super(message)
    this.name = 'RequiredField'
  }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported type. Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (maxSizeInMB: number) {
    super(`File upload limit is ${maxSizeInMB}MB`)
    this.name = 'MaxFileSizeError'
  }
}
