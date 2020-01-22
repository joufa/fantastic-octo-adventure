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
    return this.start.isSame(t.getEnd()) || this.start.isAfter(t.getEnd());
  }
  isBefore(t: ITimeSpan): boolean {
    return this.end.isSame(t.getStart()) || this.end.isBefore(t.getEnd());
  }

  conflicts(t: ITimeSpan): boolean {
    if (t.getStart().isSame(this.end)) {
      return false;
    }
    if (t.getEnd().isSame(this.start)) {
      return false;
    }
    if (t.getStart().isAfter(this.end)) {
      return false;
    }
    if (t.getEnd().isBefore(this.start)) {
     return false;
    }
    return true;
  }

  isSame(t: ITimeSpan): boolean {
    return this.start.isSame(t.getStart()) && this.end.isSame(t.getEnd());
  }

  isConnectedTo(t: ITimeSpan, from: string): boolean {
    if (from !== 'start' && from !== 'end') {
      throw new Error('Invalid parameters');
    }
    if (!t) {
      return false;
    }

    const fromStart = from === 'start' ? true : false;

    if (fromStart) {
      const diff = this.start.diff(t.getEnd());
      return diff === 0;
    } else {
      const diff = this.end.diff(t.getStart());
      return diff === 0;
    }
  }

  private span(): m.Duration {
    const diff = this.end.diff(this.start);
    return m.duration(diff);
  }

  toString() {
    return `${this.start.hours()}.${this.start.minutes()} - ${this.end.hours()}.${this.end.minutes()}`;
  }

}
