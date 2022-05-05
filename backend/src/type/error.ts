interface ValidationError extends Error {
  log: (arg) => void;
}

export class AuthError implements ValidationError  {
  name = "authError";
  message: string;
  statusCode = 400;
  
  constructor(message){
    this.message = message;
  }
  
  log(arg) {
    console.error(arg);
  }
}
