import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { TimeSpanComponent } from './app/time-span/time-span.component';
import { TimeSpanPipe } from './time-span.pipe';
import { SimpleDatePipe } from './simple-date.pipe';
import { MaterialModule } from './material';

@NgModule({
  declarations: [
    AppComponent,
    TimeSpanComponent,
    TimeSpanPipe,
    SimpleDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
