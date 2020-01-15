import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TimeSpanPipe } from './time-span.pipe';
import { SimpleDatePipe } from './simple-date.pipe';

const COMPONENTS = [TimeSpanPipe, SimpleDatePipe];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS

})
export class PipesModule { }
