export class ValidationError extends Error {
  status: number;
  data: Record<string, string>;

  constructor(message: string, status: number) {
    super(message);
    this.data = {
      message: message
    };
    this.status = status;
    this.name = 'validation error';
  }
}
