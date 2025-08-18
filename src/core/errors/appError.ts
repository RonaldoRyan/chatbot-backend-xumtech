import { CustomError } from '@modules/chat/interfaces/custom.error'

export class AppError extends Error implements CustomError {
  status?: number

  constructor(message: string, status = 500) {
    super(message)
    this.status = status
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
