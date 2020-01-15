import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {
  private iso8601DurationRegex =
    new RegExp('(-)?P(?:([.,\\d]+)Y)?(?:([.,\\d]+)M)?(?:([.,\\d]+)W)?(?:([.,\\d]+)D)?T(?:([.,\\d]+)H)?(?:([.,\\d]+)M)?(?:([.,\\d]+)S)?');

    transform(value: string): string {

    if (!this.iso8601DurationRegex.test(value)) {
      return value;
    }

    const matches = value.match(this.iso8601DurationRegex);
    const durations = this.convert(matches);

    return this.stringify(durations);
  }

  private convert(data: any[]): Durations {
    return {
      sign: data[1] === undefined ? '+' : '-',
      years: data[2] === undefined ? 0 : data[2],
      months: data[3] === undefined ? 0 : data[3],
      weeks: data[4] === undefined ? 0 : data[4],
      days: data[5] === undefined ? 0 : data[5],
      hours: data[6] === undefined ? 0 : data[6],
      minutes: data[7] === undefined ? 0 : data[7],
      seconds: data[8] === undefined ? 0 : data[8]
    };
  }

  private stringify(data: Durations): string {
    const builder: string[] = [];
    if (data.minutes) {
      builder.push(`${data.minutes} min`);
    }
    if (data.hours) {
      builder.push(`${data.hours} h`);
    }
    return builder.reverse().join(' ');
  }

}

export interface Durations {
  sign: string;
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
