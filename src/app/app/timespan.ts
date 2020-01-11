import * as moment from 'moment';
export interface TimeSpan {
  /**
   * ISO_8601 Time Interval
   */
  duration(): string;
  getStart(): any;
  getEnd(): any;

}
export class SimpleTimeSpan implements TimeSpan {


  private start: moment.Moment;
  private end: moment.Moment;
  private format = 'hh.mm';

  constructor(start: string, end: string) {
    this.start = moment(start, this.format);
    this.end = moment(end, this.format);

    if (this.end.isSameOrBefore(this.start)) {
      throw new Error('End date is before start date');
    }
  }

  duration(): string {
    return this.span().toJSON();
  }

  private span(): moment.Duration {
    const diff = this.end.diff(this.start);
    return moment.duration(diff);
  }
  getStart() {
    return this.start;
  }
  getEnd() {
    return this.end;
  }

}
