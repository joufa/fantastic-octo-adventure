import { Injectable } from '@angular/core';
import { TimespanService } from '../domain/service/timespan.service';
import { Types } from './command.types';
import { AddTimeSpan,
         Command,
         DeleteTimeSpan,
         StartPendingFromTime,
         StartPending,
         EndPending,
         DeleteAll,
         Select,
         DeleteOne
        } from './commands';

@Injectable({
  providedIn: 'root'
})
export class CommandFactory {

  constructor(private service: TimespanService) { }

  public create(c: Types): Command {

    if (c === null || c === undefined) {
      return null;
    }

    switch (+c) {
      case (Types.ADD_TIMESPAN): {
        return new AddTimeSpan(this.service);
      }
      case (Types.DELETE_TIMESPAN): {
        return new DeleteTimeSpan(this.service);
      }
      case (Types.START_PENDING_FROM_TIME): {
        return new StartPendingFromTime(this.service);
      }
      case (Types.START_PENDING): {
        return new StartPending(this.service);
      }
      case (Types.END_PENDING): {
        return new EndPending(this.service);
      }
      case (Types.DELETE_ALL): {
        return new DeleteAll(this.service);
      }
      case (Types.SELECT_ONE): {
        return new Select(this.service);
      }
      case (Types.UNSELECT_ONE): {
        return new Select(this.service);
      }
      case (Types.DELETE_ONE): {
        return new DeleteOne(this.service);
      }
      default:
        return null;
    }
  }
}
