import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MomentTimeSpan, TimeSpan } from './timespan';
import { MomentService } from './moment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  exp = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]-([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$');
  readonly DATES = 'dates';
  loginForm: FormGroup;
  sub: Subscription;
  durations: TimeSpan[] = [];
  now: number;

  constructor(ms: MomentService) {
    this.now = ms.moment.now();
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

  handleValue(value: string) {
    if (!this.exp.test(value)) {
      return;
    }
    try {

      const dates: string[] = value.split('-');
      const ts = new MomentTimeSpan(dates[0], dates[1]);
      this.durations.push(ts);
      this.loginForm.get(this.DATES).setValue(null);

    } catch (error) {
      console.error(error);
    }
  }



}
