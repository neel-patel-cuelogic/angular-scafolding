import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: variable-name
  private _user: any = null;
  private onUserInfoUpateSub: BehaviorSubject<any> = new BehaviorSubject(this.getUser());
  public onUserInfoUpate: any = null;

  constructor() {
    let user: any = this.getUserFromLocalStorage();
    if (user) {
      user = JSON.parse(window.atob(user));
      if (user.isAdmin) {
        this.setUser(user);
      }
    }
    this.onUserInfoUpate = this.onUserInfoUpateSub.asObservable();
   }


  public setUser(user) {
    this._user = {
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin || false,
      token: user.token
    };
    if (user.isAdmin) {
      localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));
    }
    this.onUserInfoUpateSub.next({...this._user});
  }

  public getUser() {
    if (this._user) {
      return {...this._user};
    } else {
      return null;
    }
  }

  public getUserId() {
    if (this._user) {
      return this._user.id;
    } else {
      return null;
    }
  }

  public getToken() {
    if (this._user) {
      return this._user.token;
    } else {
      return '';
    }
  }

  public removeUser() {
    this._user = null;
    localStorage.removeItem('user');
    this.onUserInfoUpateSub.next(null);
  }

  public getUserFromLocalStorage() {
    return localStorage.getItem('user');
  }
}
