import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimeSpan } from './timespan';
import { TimespanService } from './timespan.service';
import { TimeInterpreterService } from './interpreter';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  now: Observable<Date>;
  data$: Observable<TimeSpan[]>;
  duration$: Observable<string>;

  clearSubject: Subject<void> = new Subject<void>();

  constructor(private service: TimespanService, private int: TimeInterpreterService) {
  }

  ngOnInit(): void {
    this.now = this.service.date$;
    this.data$ = this.service.data$;
    this.duration$ = this.service.duration$;
  }


  remove(t: TimeSpan) {
    this.service.removeSpan(t);
  }

  add(t: TimeSpan) {
   this.service.addSpan(t);
  }

  handleValue(text: string) {
    try {
      if (this.int.handle(text)) {
        // Command succeeded
        this.clearSubject.next();
      }
    } catch (error) {
      console.error(error);
    }
  }

}
