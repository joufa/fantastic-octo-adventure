import { Component, Input } from '@angular/core';

import { ITimeSpan } from 'src/app/core/domain/model/interfaces/timespan';

@Component({
  selector: 'app-time-span',
  template: `
    <mat-card class="span-card">
      <div class="row">
        <div class="col-md-6">
          <span>{{start | dateString}} - {{end | dateString}}</span>
        </div>
        <div class="col-md-6 text-right">
          <span>{{duration | timeSpan}}</span>
        </div>
      </div>
    </mat-card>
  `,
  styles: ['']
})
export class TimeSpanComponent {

  @Input()
  span: ITimeSpan;

  constructor() { }

  get start() {
    return this.span.getStart();
  }

  get end() {
    return this.span.getEnd();
  }

  get duration(): string {
    return this.span.durationAsString();
  }

}
