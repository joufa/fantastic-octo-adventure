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
}
