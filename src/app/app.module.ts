import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main/main-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { EmployeesDetailComponent } from './components/employees-detail/employees-detail.component';
import { FavorsComponent } from './components/favors/favors.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AntModule } from './ant.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { employeesReducer } from './state/reducers/employees.reducers';
import { reducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { SearchesEffects } from './state/searches.effects';
import { NgxSpinnerModule } from "ngx-spinner";


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EmployeesDetailComponent,
    SearchResultsComponent,
    FavorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    AntModule,
    FormsModule,
    NgxSpinnerModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
  }),
    EffectsModule.forRoot([SearchesEffects])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
