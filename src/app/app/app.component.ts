import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { TimeData } from '../core/domain/service/time-data';
import { TimespanService } from '../core/domain/service/timespan.service';
import { TimeInterpreterService } from '../interpreter/interpreter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data$: Observable<TimeData>;

  clearSubject: Subject<void> = new Subject<void>();

  constructor(private service: TimespanService,
              private int: TimeInterpreterService,
              private ts: TranslateService) { }

  ngOnInit(): void {
    this.ts.use('en');
    this.data$ = this.service.data$;
  }

  handleValue(text: string) {
    if (this.int.handle(text)) {
      // Command succeeded
      this.clearSubject.next();
    }
  }
}
