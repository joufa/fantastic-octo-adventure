import { ITimeSpan } from '../model/interfaces/timespan';

export interface ITimeData {
  flush(): TimeData;
}

export class TimeData implements ITimeData {

  data: ITimeSpan[];
  duration: string;
  date: Date;
  pending: boolean;
  pendingTime: string;
  selected: ITimeSpan;
  breakDuration: string;
  percentage: string;
  etd: Date;

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
    return td;
  }
}
