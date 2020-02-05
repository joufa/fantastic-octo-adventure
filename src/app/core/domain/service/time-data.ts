import { ITimeSpan } from '../model/interfaces/timespan';

export interface ITimeData {
  flush(): TimeData;
}

export class TimeData implements ITimeData {

  /**
   * Timespan objects
   */
  data: ITimeSpan[];
  /**
   * Total worktime duration
   */
  duration: string;
  /**
   * Current date
   */
  date: Date;
  pending: boolean;
  pendingTime: string;
  selected: ITimeSpan;
  /**
   * Total duration of breks
   */
  breakDuration: string;
  percentage: string;
  /**
   * Estimed time of departure
   */
  etd: Date;
  /**
   * Duration as decimal string
   */
  decimalDuration: string;

  flush(): TimeData {
    const td = new TimeData();
    td.data = this.data;
    td.date = this.date;
    td.duration = this.duration;
    td.pending = this.pending;
    td.pendingTime = this.pendingTime;
    td.selected = this.selected;
    td.breakDuration = this.breakDuration;
    td.percentage = this.percentage;
    td.etd = this.etd;
    td.decimalDuration = this.decimalDuration;
    return td;
  }
}
