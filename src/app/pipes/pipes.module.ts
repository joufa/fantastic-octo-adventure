import { NgModule } from '@angular/core';
import { TimeSpanPipe } from './time-span.pipe';
import { MomentToStringPipe } from './simple-date.pipe';
import { EtdTimePipe } from './time.pipe';

const COMPONENTS = [TimeSpanPipe, MomentToStringPipe, EtdTimePipe];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS

})
export class PipesModule { }
