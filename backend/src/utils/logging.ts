interface Log {
  write: (message: string) => void;
}

export const logging = (() => {
  return new class Logging implements Log {
    write(message: string) {
      console.dir(message);
    }
  }()
})()