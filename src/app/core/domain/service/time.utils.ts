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

  static roundToNearestQuarter(time: string | Date): Date {
    const d = this.toMoment(time);
    const roundedMinutes = Math.round(d.clone().minute() / 15) * 15;
    return d.clone().minute(roundedMinutes).second(0).toDate();
  }

  static durationToDecimal(time: m.Duration): string {
    if (!time) {
      return '0';
    }
    const minutes = time.minutes();
    const hours = time.hours();
    const roundedMinutes = Math.round(minutes / 15) * 15;
    if (roundedMinutes === 0) {
      return `${hours}`;
    }
    if (roundedMinutes === 60) {
      return `${hours + 1}`;
    }
    let minuteString: string;
    switch (roundedMinutes) {
      case 15:
        minuteString = '25';
        break;
      case 30:
        minuteString = '5';
        break;
      case 45:
        minuteString = '75';
        break;
      default:
        throw new Error('Minute conversion failure');

    }
    return `${hours}.${minuteString}`;
  }

  private static toMoment(date: string | Date): m.Moment {
    if (typeof date === 'string') {
      return m(date, 'HH:mm');
    }
    return m(date);
  }
}
