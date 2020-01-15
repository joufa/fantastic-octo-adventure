import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-time-input',
  template: `
    <div class="row">
      <div class="col-md-12">
        <mat-card>
          <form [formGroup]="loginForm">
            <mat-form-field class="input-field">
              <input id="intepreter" matInput formControlName="dates" autofocus>
            </mat-form-field>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: ['.input-field {width: 100%;}']
})
export class TimeInputComponent implements OnInit, OnDestroy {

  private readonly DATES = 'dates';

  private formSub: Subscription;
  private clearSub: Subscription;

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
    this.formSub = this.loginForm.get(this.DATES).valueChanges.subscribe(value => this.sendText(value));
    this.clearSub = this.clear.subscribe(() => this.clearInputField());
  }

  clearInputField() {
    this.loginForm.get(this.DATES).setValue(null);
  }

  sendText(text: string) {
    this.text.emit(text);
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
    this.clearSub.unsubscribe();
  }

}
