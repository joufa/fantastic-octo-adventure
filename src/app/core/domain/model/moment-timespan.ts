import { ITimeSpan } from './interfaces/timespan';
import * as m from 'moment';
import { WdError } from '../base/wd-error';
import { WdErrorCodes } from './error.codes';

export class MomentTimeSpan implements ITimeSpan {

  private readonly format = 'hh.mm';
  private start: m.Moment;
  private end: m.Moment;


  constructor(start: string, end: string) {
    this.start = m(start, this.format);
    this.end = m(end, this.format);

    if (this.end.isSameOrBefore(this.start)) {
      throw new WdError(WdErrorCodes.ENDTIME_SAME_OR_BEFORE_STARTTIME);
    }
  }

  durationAsString(): string {
    return this.span().toJSON();
  }

  duration(): m.Duration {
    return this.span();
  }

  getStart() {
    return this.start;
  }
  getEnd() {
    return this.end;
  }

  isAfter(t: ITimeSpan): boolean {
    return this.end.isAfter(t.getStart());
  }
  isBefore(t: ITimeSpan): boolean {
    return this.end.isBefore(t.getStart());
  }

  conflicts(t: ITimeSpan): boolean {
    if (this.start.isAfter(t.getEnd())) {
      return false;
    }
    if (t.getStart().isBefore(this.end) || t.getStart().isBefore(this.end)) {
      return true;
    }
    return false;
  }

  isSame(t: ITimeSpan): boolean {
    return this.start.isSame(t.getStart()) && this.end.isSame(t.getEnd());
  }

  isConnectedTo(t: ITimeSpan, fromStart: boolean): boolean {
    throw new Error('Method not implemented.');
  }

  private span(): m.Duration {
    const diff = this.end.diff(this.start);
    return m.duration(diff);
  }

  toString() {
    return `${this.start} - ${this.end}`;
  }

}
