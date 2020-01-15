import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { TimeSpanComponent } from './app/time-span/time-span.component';

import { MaterialModule } from './material';
import { TimeInputComponent } from './app/time-input/time-input.component';
import { PipesModule } from './pipes';
import { ContextComponent } from './app/context/context.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeSpanComponent,
    TimeInputComponent,
    ContextComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
