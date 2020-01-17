import { NgModule } from '@angular/core';
import { TimeSpanPipe } from './time-span.pipe';
import { MomentToStringPipe } from './simple-date.pipe';

const COMPONENTS = [TimeSpanPipe, MomentToStringPipe];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS

})
export class PipesModule { }
