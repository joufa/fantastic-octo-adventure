import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MomentService } from './moment.service';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeSpanComponent } from './time-span/time-span.component';
import { SimpleDatePipe } from '../simple-date.pipe';
import { TimeSpanPipe } from '../time-span.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TimeSpanComponent,
        SimpleDatePipe,
        TimeSpanPipe
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule
      ],
      providers: [MomentService]
    },
    ).compileComponents();
  },
  ));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
