import * as m from 'moment';

export class TimeUtils {

  static nowString() {
    const now: Date = new Date();
    const hours: string = (now.getHours() > 9) ? now.getHours().toString() : `0${now.getHours()}`;
    const minutes: string = (now.getMinutes() > 9) ? now.getMinutes().toString() : `0${now.getMinutes()}`;
    return `${hours}.${minutes}`;
  }

  static isSameDay(first: Date, second: Date): boolean {
    return new Date(first).getDay() === new Date(second).getDay();
  }

  static getETD(expected: number, latestEnd: Date, duration: number): Date {
    const left = expected - duration;
    const dateString: string = latestEnd.getHours() + '.' + latestEnd.getMinutes();
    const momentDate = m(dateString, 'HH.mm');
    const result = momentDate.add(left, 'seconds');
    return result.toDate();
  }
}
