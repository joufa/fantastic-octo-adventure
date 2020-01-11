import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { TimeSpanComponent } from './app/time-span/time-span.component';
import { TimeSpanPipe } from './time-span.pipe';
import { SimpleDatePipe } from './simple-date.pipe';


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
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
