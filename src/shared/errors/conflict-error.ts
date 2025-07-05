import { CustomError } from './custom-error'

export class ConflictError extends CustomError {
  statusCode = 409

  constructor(readonly reason: string) {
    super(reason)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
