import { AxiosError } from 'axios';

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

export class AuthError extends Error {
  data: Record<string, string>;

  constructor(message: string) {
    super(message);
    this.data = {
      message: message
    };
    this.name = 'auth error';
  }
}

export const errorMessage = {
  signIn: 'user info not correct',
  userMe: 'no session',
  signUp: "this id can't be use"
};

export const errorInstanceMaker = (
  e: AxiosError<{ statusCode: number; message?: string }>
): Error => {
  const { response } = e;
  if (response) {
    switch (response.status) {
      case 401:
        return new AuthError(response.data.message || errorMessage.userMe);
    }
  }
  return e;
};
