export class AppError extends Error {
  status: string;
  statusCode: Number;
  isOperational: Boolean;
  constructor(message: string, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
