export class AuthError {
  message: string;
  status: number;

  constructor(message, status = 401) {
    this.message = message;
    this.status = status;
  }
}
