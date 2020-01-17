import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimespanService } from '../core/domain/service/timespan.service';
import { TimeInterpreterService } from './interpreter';
import { ITimeSpan } from '../core/domain/model/interfaces/timespan';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  now$: Observable<Date>;
  data$: Observable<ITimeSpan[]>;
  duration$: Observable<string>;

  clearSubject: Subject<void> = new Subject<void>();

  // TODO: Show notifications
  constructor(private service: TimespanService,
              private int: TimeInterpreterService) {
  }

  ngOnInit(): void {
    this.now$ = this.service.date$;
    this.data$ = this.service.data$;
    this.duration$ = this.service.duration$;
  }

  handleValue(text: string) {
      if (this.int.handle(text)) {
        // Command succeeded
        this.clearSubject.next();
      }
  }

}
