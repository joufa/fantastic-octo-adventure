import { Injectable } from '@angular/core';
import { TimespanService } from './timespan.service';
import { TimeSpan, MomentTimeSpan } from './timespan';

export interface Intepreter {
  handle(text: string): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TimeInterpreterService implements Intepreter {

  private exp = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]-([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$');
  private deleteExp = new RegExp('^d ([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]-([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$');

  constructor(private ts: TimespanService) {}

  handle(text: string): boolean {
    // Add entry
    if (this.exp.test(text)) {
        const ts = this.createTimeSpan(text);
        this.ts.addSpan(ts);
        return true;
    }
    // Delete entry
    if (this.deleteExp.test(text)) {
        const ts = this.createTimeSpan(text.substr(2, text.length));
        this.ts.removeSpan(ts);
        return true;
    }
    return false;
  }

  private createTimeSpan(expr: string): TimeSpan {
    const dates: string[] = expr.split('-');
    return new MomentTimeSpan(dates[0], dates[1]);
  }

}
