import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-time-input',
  template: `
    <div class="row">
      <div class="col-md-12">
        <mat-card>
          <form [formGroup]="loginForm">
            <mat-form-field class="input-field">
              <mat-icon matPrefix class="input-icon">access_time</mat-icon>
              <input id="intepreter" matInput formControlName="dates" autofocus>
            </mat-form-field>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: ['.input-field {width: 100%;} .input-icon {vertical-align: bottom; margin-right: 5px}']
})
export class TimeInputComponent implements OnInit, OnDestroy {

  private readonly DATES = 'dates';

  private formSubscription$: Subscription;
  private clearSubscription$: Subscription;

  @Input()
  clear: Observable<void>;


  @Output()
  text: EventEmitter<string> = new EventEmitter();

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      dates: new FormControl(null)
    });
  }

  ngOnInit() {
    this.formSubscription$ = this.loginForm.get(this.DATES).valueChanges.subscribe(value => this.sendText(value));
    this.clearSubscription$ = this.clear.subscribe(() => this.clearInputField());
  }

  clearInputField(): void {
    this.loginForm.get(this.DATES).setValue(null);
  }

  sendText(text: string) {
    this.text.emit(text);
  }

  ngOnDestroy(): void {
    this.formSubscription$.unsubscribe();
    this.clearSubscription$.unsubscribe();
  }

}
