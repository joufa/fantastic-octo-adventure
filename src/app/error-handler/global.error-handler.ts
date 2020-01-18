import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { WdError } from '../core/domain/base/wd-error';
import { NotificationService } from '../notifications/notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error) {
    const ns = this.injector.get(NotificationService);
    const message = error.message ? error.message : error;

    if (error instanceof WdError) {
      // Show notification and swallow
      ns.default(message);
    } else {
      console.error(message);
      ns.default('Oops! Something went wrong :(');
    }

  }
}

