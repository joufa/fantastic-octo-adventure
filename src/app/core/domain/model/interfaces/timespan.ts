import * as m from 'moment';
import { Collection } from './collection';

export interface ITimeSpan {
  /**
   * ISO_8601 Time Interval
   */
  durationAsString(): string;
  duration(): m.Duration;
  getStart(): m.Moment;
  getEnd(): m.Moment;
  conflicts(t: ITimeSpan): boolean;
  isAfter(t: ITimeSpan): boolean;
  isBefore(t: ITimeSpan): boolean;
  isSame(t: ITimeSpan): boolean;
  isConnectedTo(t: ITimeSpan, fromStart: boolean): boolean;
}

export interface ITimeCollection extends Collection<ITimeSpan> {
  day(): Date;
  getDurationAsString(): string;
  getDuration(): m.Duration;
}
