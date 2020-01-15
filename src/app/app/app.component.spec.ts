import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MomentService } from './moment.service';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeSpanComponent } from './time-span/time-span.component';
import { PipesModule } from '../pipes';
import { Subject } from 'rxjs';
import { TimeInputComponent } from './time-input/time-input.component';
import { TimespanService } from './timespan.service';
import { TimeInterpreterService } from './interpreter';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TimeSpanComponent,
        TimeInputComponent
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        PipesModule
      ],
      providers: [MomentService, TimespanService, TimeInterpreterService]
    },
    ).compileComponents();
  },
  ));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.clearSubject = new Subject<void>();
    expect(app).toBeTruthy();
  });

});
