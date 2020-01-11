import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSpanComponent } from './time-span.component';

describe('TimeSpanComponent', () => {
  let component: TimeSpanComponent;
  let fixture: ComponentFixture<TimeSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
