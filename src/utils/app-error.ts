export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class HttpError extends AppError {
  constructor(statusCode: number, message: string, isOperational = true) {
    super(statusCode, message, isOperational);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
