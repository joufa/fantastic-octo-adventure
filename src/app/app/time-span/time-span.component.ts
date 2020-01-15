import { Component, Input } from '@angular/core';
import { TimeSpan } from '../timespan';

@Component({
  selector: 'app-time-span',
  templateUrl: './time-span.component.html',
  styleUrls: ['./time-span.component.scss']
})
export class TimeSpanComponent {

  @Input()
  span: TimeSpan;

  constructor() { }

  get start() {
    return this.span.getStart();
  }

  get end() {
    return this.span.getEnd();
  }

  get duration() {
    return this.span.durationAsString();
  }

}
