import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

const MODULES = [
  MatCardModule,
  MatInputModule,
  MatToolbarModule
  ];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule { }
