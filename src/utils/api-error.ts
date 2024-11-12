interface ApiErrorParams {
  message: string;
  statusCode: number;
  error?: unknown;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly error?: unknown;

  constructor({ message, statusCode, error }: ApiErrorParams) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.name = "ApiError";
  }
}
