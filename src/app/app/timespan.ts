import { MomentService, DateTimeService } from './moment.service';

export interface TimeSpan {
  /**
   * ISO_8601 Time Interval
   */
  duration(): string;
  getStart(): any;
  getEnd(): any;
  compareTo(t: TimeSpan): number;
  conflicts(t: TimeSpan): boolean;
}

export class MomentTimeSpan implements TimeSpan {

  private ms: DateTimeService;
  private moment: any;
  private start: any;
  private end: any;
  private format = 'hh.mm';

  constructor(start: string, end: string) {
    this.ms = new MomentService();
    this.moment = this.ms.get();
    this.start = this.moment(start, this.format);
    this.end = this.moment(end, this.format);

    if (this.end.isSameOrBefore(this.start)) {
      throw new Error('End date is before start date');
    }
  }

  duration(): string {
    return this.span().toJSON();
  }

  private span(): any {
    const diff = this.end.diff(this.start);
    return this.moment.duration(diff);
  }
  getStart() {
    return this.start;
  }
  getEnd() {
    return this.end;
  }

  compareTo(t: TimeSpan): number {
   return 1;
  }

  conflicts(t: TimeSpan): boolean {
    const startMoment = this.moment(t.getStart());
    return false;
  }


}
