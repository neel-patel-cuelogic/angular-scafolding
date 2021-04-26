import { Injectable, EventEmitter, Output } from '@angular/core';
import { CanActivate, Router, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
// import { CookieService } from './cookie-wrapper.service';
// import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(
        private _authService: AuthService,
        private _router: Router,
        // private _cookieService: CookieService,
        // private _sharedService: SharedService
    ) { }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
        /* let clientDetails = this._authService.getUser();
        if (this._cookieService.verifyCloudFrontCookie()) {
            if ((clientDetails && clientDetails.isAdmin) && !this._authService.getUserFromLocalStorage()) {
                let cookieExpiredMessage = 'Your session has been expired. Please login again';
                this._sharedService.onCustomEvent.next({ event: 'cookiesExpired', data: cookieExpiredMessage });
                this._authService.removeUser();
                this._cookieService.clearCloudfrontCookies();
                return this._router.parseUrl('/admin');
            } else {
                if (clientDetails) {
                    return true;
                }
                return this._router.parseUrl('/account/login');
            }
        } else {
            let cookieExpiredMessage = 'Your session has been expired. Please login again';
            this._sharedService.onCustomEvent.next({ event: 'cookiesExpired', data: cookieExpiredMessage });
            this._cookieService.clearCloudfrontCookies();
            this._authService.removeUser();
            if (clientDetails && clientDetails.isAdmin) {
                return this._router.parseUrl('/admin');
            } else {
                return this._router.parseUrl('/account/login');
            }
        } */
        return true;
    }

    canActivateChild() {
        return this.canActivate();
    }
}
