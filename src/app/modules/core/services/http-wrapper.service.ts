import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpEventType,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class HttpWrapperService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _router: Router
  ) {}

  get(url: string, options?: any): Observable<Response> {
    return this._request("GET", url, options);
  }

  post(url: string, data: any, options: any = {}): Observable<Response> {
    options = { ...options, body: data };
    return this._request("POST", url, options);
  }

  put(url: string, data: any, options?: any): Observable<Response> {
    let reqBody = { body: data };
    if (options) {
      reqBody = { ...options, body: data };
    }
    return this._request("PUT", url, reqBody);
  }

  delete(url: string, data?: any, options?: any): Observable<Response> {
    let reqBody;
    if (data || options) {
      reqBody = { ...options, body: data };
    }
    return this._request("DELETE", url, reqBody);
  }

  private _request(method: string, url: string, options: any = {}) {
    // console.log(url, method, options)
    const _token = this._authService.getToken();
    let _headers = new HttpHeaders().set("Authorization", _token);

    if (options.headers) {
      _headers = new HttpHeaders({ ...options.headers });
    }

    options = { ...options, headers: _headers };
    return Observable.create((observer: any) => {
      this._http.request(method, url, options).subscribe(
        (response: any) => {
          if (options.observe === "events") {
            observer.next({ id: options.id, ...response });
            if (response.type === HttpEventType.Response) {
              observer.complete();
            }
          } else {
            observer.next(response);
            observer.complete();
          }
        },
        (error) => {
          switch (error.status) {
            case 400:
              observer.error(error);
              observer.complete();
              break;
            case 401:
              observer.error(error);
              observer.complete();
              break;
            case 403:
              let clientDetails = this._authService.getUser();
              let baseRedirectURL = "/login";
              if (clientDetails.isAdmin) {
                baseRedirectURL = "/admin";
              }
              this._authService.removeUser();
              if (error.error && error.error.customMessage) {
                this.displayMessage(error.error.customMessage);
              }
              observer.complete();
              this._router.navigate([baseRedirectURL]);
              break;
            case 500:
              // this.displayMessage(error.message);
              observer.error(error);
              observer.complete();
              break;
            default:
              // this.displayMessage(error.message);
              observer.error(error);
              observer.complete();
              break;
          }
        }
      );
    });
  }

  displayMessage(message) {
    // this._sharedService.onCustomEvent.next({
    //   event: 'toastMessage', data: {
    //     message,
    //     duration: 3000,
    //     panelClass: 'error',
    //     verticalPosition: 'top',
    //     horizontalPosition: 'right'
    //   }
    // });
  }
}
