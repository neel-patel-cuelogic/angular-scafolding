import { Injectable, EventEmitter } from "@angular/core";
import { HttpWrapperService } from "./http-wrapper.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoreService {
  constructor(private _http: HttpWrapperService) {}

  logout(userId): Observable<Response> {
    const request = {
      userId,
      logoutTime: new Date().getTime(),
    };
    return this._http.post(environment.api_url + "/auth/logout", request);
  }
}
