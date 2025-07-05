import { CustomError } from './custom-error'

export class UnauthorizedError extends CustomError {
  statusCode = 401

  constructor(message: string) {
    super(message)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
