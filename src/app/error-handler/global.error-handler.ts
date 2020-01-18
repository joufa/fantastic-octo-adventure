import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { WdError } from '../core/domain/base/wd-error';
import { NotificationService } from '../notifications/notification.service';
import { WdErrorCodes } from '../core/domain/model/error.codes';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }


  handleError(error) {
    const ns = this.injector.get(NotificationService);
    const ts = this.injector.get(TranslateService);
    const message = error.message ? error.message : error;

    if (error instanceof WdError) {
      // Show notification and swallow
      ns.default(this.getInstant(this.getTextForError(error.code), ts));
    } else {
      console.error(message);
      ns.default(this.getInstant('wd.error.default', ts));
    }

  }

  private getInstant(text: string, ts: TranslateService) {
    return ts.instant(text);
  }

  private getTextForError(code: WdErrorCodes): string {
    switch (+code) {
      case WdErrorCodes.ENDTIME_SAME_OR_BEFORE_STARTTIME:
        return 'wd.error.endtime-same-or-before-starttime';
      case WdErrorCodes.TIME_CONFLICT:
        return 'wd.error.time-conflict';
      case WdErrorCodes.ITEM_DOES_NOT_EXIST:
        return 'wd.error.item-does-not-exist';
      case WdErrorCodes.TIMESPAN_NOT_FOUND:
        return 'wd.error.timespan-not-found';
      case WdErrorCodes.CANNOT_END_PENDING:
        return 'wd.error.cannot-end-pending';
      case WdErrorCodes.ALREADY_PENDING:
        return 'wd.error.already-pending';
      case WdErrorCodes.CANNOT_REMOVE_TIMESPAN:
        return 'wd.error.cannot-remove-timespan';
      case WdErrorCodes.CANNOT_ADD_TIMESPAN:
        return 'wd.error.cannot-add-timespan';
      default:
        return 'wd.error.default';
      }
    }
}

