import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  MatMenuModule,
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

import { routing } from './app.routing';
import { reducers, metaReducers } from './app.reducers';
import { effects } from './app.effects';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';

import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpinnerComponent } from './common/components/spinner/spinner.component';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    // as main store
    StoreModule.forRoot(reducers, { metaReducers }),
    RouterModule.forRoot(routing),
    EffectsModule.forRoot(effects),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot(),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    MainLayoutComponent,
    HomeComponent,
    NotFoundComponent,
    SpinnerComponent],
  entryComponents: [SignInFormComponent, SignUpFormComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [MainLayoutComponent]
})

export class AppModule { }