import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { TimeSpanComponent } from './app/time-span/time-span.component';

import { MaterialModule } from './material';
import { TimeInputComponent } from './app/time-input/time-input.component';
import { PipesModule } from './pipes';
import { ContextComponent } from './app/context/context.component';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { TimeCollectionRepository } from './domain/repository/timecollection.repo';
import { LocalStorageRepository } from './data/repo/timespan.repo';
import { GlobalErrorHandler } from './error-handler/global.error-handler';
import { TimeInterpreterService, Interpreter } from './interpreter';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ROOT_REDUCERS, metaReducers } from './reducers';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    MaterialModule,
    CoreModule,
    DataModule,
    PipesModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
  ],
  providers: [
    {
      provide: TimeCollectionRepository,
      useClass: LocalStorageRepository
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: Interpreter,
      useClass: TimeInterpreterService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
