import { MomentService, DateTimeService } from './moment.service';
import { Time } from '@angular/common';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

export interface TimeSpan {
  /**
   * ISO_8601 Time Interval
   */
  durationAsString(): string;
  duration(): number;
  getStart(): any;
  getEnd(): any;
  conflicts(t: TimeSpan): boolean;
  isAfter(t: TimeSpan): boolean;
  isBefore(t: TimeSpan): boolean;
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

  durationAsString(): string {
    return this.span().toJSON();
  }

  duration(): number {
    return this.span();
  }

  getStart() {
    return this.start;
  }
  getEnd() {
    return this.end;
  }

  compareTo(t: TimeSpan): number {
    if (this.start.isAfter(t.getStart())) {
      return 1;
    }
    if (this.start.isBefore(t.getStart())) {
      return -1;
    }
    if (this.start.isSame(t.getStart()) && this.end.isSame(t.getEnd())) {
      return 0;
    }
  }

  isAfter(t: TimeSpan): boolean {
    return this.end.isAfter(t.getStart());
  }
  isBefore(t: TimeSpan): boolean {
    return this.end.isBefore(t.getStart());
  }

  conflicts(t: TimeSpan): boolean {

    if (this.start.isAfter(t.getEnd())) {
      return false;
    }
    if (t.getStart().isBefore(this.end) || t.getStart().isBefore(this.end)) {
      return true;
    }
    return false;
  }

  private span(): any {
    const diff = this.end.diff(this.start);
    return this.moment.duration(diff);
  }

  toString() {
    return `${this.start} - ${this.end}`;
  }

}
