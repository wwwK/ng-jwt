﻿import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset } from './ngrx/actions';
// import { StartLoadCurrentUserInfo } from '../auth/ngrx/actions';
import { Router } from '@angular/router';

import { UserRoles } from '../common/user-roles';
import { ICurrentUser } from '../common/models';
import { AuthService } from '../auth/auth.service';

import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

import { IMainReducerState } from '../app.reducers';
import { selectFeatureCount } from './ngrx/selectors';

@Component({
  selector: 'app-root',
  templateUrl: 'main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  count$: Observable<number>;

  currentUser: ICurrentUser;
  signInFormDialogRef: MatDialogRef<SignInFormComponent>;
  signUpFormDialogRef: MatDialogRef<SignUpFormComponent>;
  // private roles: string[];
  private authority: string;

  constructor(
    private dialog: MatDialog,
    private store: Store<IMainReducerState>,
    private router: Router,
    private authService: AuthService
  ) {
    this.count$ = store.pipe(select(selectFeatureCount));
    // this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  openSignInFormDialog() {
    this.signInFormDialogRef = this.dialog.open(SignInFormComponent);
  }

  openSignUpFormDialog() {
    this.signUpFormDialogRef = this.dialog.open(SignUpFormComponent);
  }

  increment() {
    this.store.dispatch(new Increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset() {
    this.store.dispatch(new Reset());
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === UserRoles.ADMIN;
  }

  logout() {
    this.authService.clearSessionStorage();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // console.log(this.tokenStorage.getToken());

    // this.store.dispatch(new StartLoadCurrentUserInfo());

    if (this.authService.getToken()) {
      // this.roles = this.tokenStorage.getAuthorities();
      // this.roles.every(role => {
      //   if (role === 'ROLE_ADMIN') {
      //     this.authority = 'admin';
      //     return false;
      //   } else if (role === 'ROLE_PM') {
      //     this.authority = 'pm';
      //     return false;
      //   }
      //   this.authority = 'user';
      //   return true;
      // });
    }
  }
}