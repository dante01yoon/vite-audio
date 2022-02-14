export class PayloadError {
  message: string;
  status: number;

  constructor(message, status = 400) {
    this.message = message;
    this.status = status;
  }
}
