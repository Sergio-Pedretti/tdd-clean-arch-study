import { RequiredField } from '@/application/erros'
import { Validator } from '@/application/validation'

export class Required implements Validator {
  constructor (
    readonly value: any,
    readonly fieldName?: string
  ) {}

  validate (): Error | undefined {
    if (this.value === null || this.value === undefined) {
      return new RequiredField(this.fieldName)
    }
  }
}

export class RequiredStringValidator extends Required {
  constructor (
    override readonly value: string,
    override readonly fieldName?: string
  ) {
    super(value, fieldName)
  }

  override validate (): Error | undefined {
    if (super.validate() !== undefined || this.value === '') {
      return new RequiredField(this.fieldName)
    }
  }
}
