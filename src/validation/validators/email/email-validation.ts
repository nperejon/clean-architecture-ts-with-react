import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (readonly name: string) { }
  validate (value: string): Error {
    return new InvalidFieldError()
  }
}