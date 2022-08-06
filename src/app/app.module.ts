import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './core/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableDynamicComponent } from './components/data-table-dynamic/data-table-dynamic.component';
import {
  AppTranslationService,
  createTranslateLoader,
} from './core/services/app-translation.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),
  ],
  declarations: [AppComponent, DataTableDynamicComponent],
  bootstrap: [AppComponent],
  providers: [AppTranslationService, ],
})
export class AppModule {}
