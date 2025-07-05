import { CustomError } from './custom-error'

export class ServerError extends CustomError {
  statusCode = 500

  constructor(message?: string) {
    super(message ?? 'Internal server error')
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
