import { WdErrorCodes } from './error.codes';

export class WdError extends Error {
  code: WdErrorCodes;

  constructor(code: WdErrorCodes) {
    super();
    this.code = code;
    Object.setPrototypeOf(this, WdError.prototype);
  }
}
