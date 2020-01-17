export class WdError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, WdError.prototype);
  }
}
