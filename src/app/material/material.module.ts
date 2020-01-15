import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


import {MatSnackBarModule} from '@angular/material/snack-bar';


import {MatChipsModule} from '@angular/material/chips';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MODULES = [
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
  ];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule { }
