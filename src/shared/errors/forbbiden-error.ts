import { CustomError } from './custom-error'

export class ForbiddenError extends CustomError {
  statusCode = 403

  constructor(message?: string) {
    super(message ?? 'Forbbiden')
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
