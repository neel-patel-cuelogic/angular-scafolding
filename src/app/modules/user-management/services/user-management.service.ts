import { Injectable, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpWrapperService } from "../../core/services/http-wrapper.service";

export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ACTIVE_B = "Active (Blocked)",
}

@Injectable()
export class UserManagementService {
  public currentDate = new Date();

  constructor(private _httpWrapperService: HttpWrapperService) {}

  parseUserObj(result, isResponse: boolean, timeZoneOffset) {
    let accessStatus = result.accessStatus;
    let startDate = result.accessStartDate;
    let endDate = result.accessEndDate;
    if (isResponse) {
      accessStatus = result.accessStatus === "unblock" ? true : false;
      startDate = new Date(+result.accessStartDate); // - (timeZoneOffset * 60 * 1000)
      endDate = new Date(+result.accessEndDate); // - (timeZoneOffset * 60 * 1000)
    } else {
      accessStatus = result.accessStatus ? "unblock" : "block";
      // startDate = result.accessStartDate.getTime(); // + (timeZoneOffset * 60 * 1000);
      // endDate = result.accessEndDate.getTime();// + (timeZoneOffset * 60 * 1000);
      let time = moment(result.accessStartDate).format("YYYY/MM/DD");
      startDate = moment(time).format("x");
      time = moment(result.accessEndDate).format("YYYY/MM/DD") + " 23:59:59";
      endDate = moment(time).format("x");
    }
    result.accessStatus = accessStatus;
    result.accessStartDate = startDate;
    result.accessEndDate = endDate;
    result.status =
      result.accessStatus === true &&
      this.currentDate >= result.accessStartDate &&
      this.currentDate <= result.accessEndDate
        ? UserStatus.ACTIVE
        : result.accessStatus === false &&
          this.currentDate >= result.accessStartDate &&
          this.currentDate <= result.accessEndDate
        ? UserStatus.ACTIVE_B
        : UserStatus.INACTIVE;
    return result;
  }

  getUsersList(): Observable<Response> {
    return this._httpWrapperService.get(environment.api_url + "/users");
  }

  updateUser(user): Observable<Response> {
    return this._httpWrapperService.put(environment.api_url + "/user", user);
  }

  addUser(user): Observable<Response> {
    return this._httpWrapperService.post(environment.api_url + "/user", user);
  }

  getUserHistory(userid): Observable<Response> {
    return this._httpWrapperService.get(
      environment.api_url + "/user/session-history/" + userid
    );
  }

  getLockedIpsList(userid): Observable<Response> {
    return this._httpWrapperService.get(
      environment.api_url + "/users/application-accessed?userId=" + userid
    );
  }

  toggleUserLockedStatus(data): Observable<Response> {
    return this._httpWrapperService.post(
      environment.api_url + "/users/application-accessed",
      data
    );
  }
}
