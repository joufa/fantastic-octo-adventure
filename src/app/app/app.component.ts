import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { MomentTimeSpan, TimeSpan } from './timespan';
import { MomentService } from './moment.service';
import { TimeCollection } from './timespan.collection';
import { TimeRepository } from '../repo/repo.model';
import { LocalStorageRepository } from '../repo/timespan.repo';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  exp = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]-([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$');
  deleteExp = new RegExp('^d ([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]-([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$');
  readonly DATES = 'dates';
  loginForm: FormGroup;
  sub: Subscription;
  now: number;
  collection: TimeCollection<TimeSpan>;
  repo: TimeRepository<TimeCollection<TimeSpan>>;

  data$: Observable<TimeSpan[]>;
  duration$: Observable<string>;

  constructor(ms: MomentService) {
    this.now = ms.moment.now();
    this.repo = new LocalStorageRepository();
    const data: TimeCollection<TimeSpan> = this.repo.load();

    if (!data || !this.isSameDay(data.day(), new Date(this.now))) {
      // new instance
      this.collection = new TimeCollection<MomentTimeSpan>(new Date());
      this.repo.save(this.collection);
    } else {
      this.collection = data;
    }

    this.data$ = this.collection.asObservable();
    this.duration$ = this.collection.durationObservable();
    this.loginForm = new FormGroup({
      dates: new FormControl(null)
    });

  }

  ngOnInit(): void {
    this.sub = this.loginForm.get(this.DATES)
      .valueChanges.subscribe(value => this.handleValue(value));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  remove(t: TimeSpan) {
    try {
      this.collection.remove(t);
      this.repo.save(this.collection);
    } catch (error) {
      console.error(error);
    }
  }
  add(t: TimeSpan) {
    this.collection.insert(t);
    this.repo.save(this.collection);
  }

  handleValue(value: string) {
    if (this.exp.test(value)) {
      try {
        const ts = this.createTimeSpan(value);
        this.add(ts);
        this.loginForm.get(this.DATES).setValue(null);

      } catch (error) {
        console.error(error);
      }
    } else if (this.deleteExp.test(value)) {
      try {
        const ts = this.createTimeSpan(value.substr(2, value.length));
        this.remove(ts);
        this.loginForm.get(this.DATES).setValue(null);
      } catch (error) {
        console.error(error);
      }

    }

  }

  createTimeSpan(expr: string): TimeSpan {
    const dates: string[] = expr.split('-');
    return new MomentTimeSpan(dates[0], dates[1]);
  }

  isSameDay(first: Date, second: Date): boolean {
    return new Date(first).getDay() === new Date(second).getDay();
  }

}
