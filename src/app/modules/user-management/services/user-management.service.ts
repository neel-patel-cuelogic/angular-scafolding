import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpWrapperService } from "../../core/http/http-wrapper.service";
import { UserStatus } from "../../shared/enum/enum";
import { User } from "../model/user";

@Injectable()
export class UserManagementService {
  public currentDate = new Date();

  constructor(private _httpWrapperService: HttpWrapperService) {}

  parseUserObj(result, isResponse: boolean) {
    let accessStatus = result.accessStatus;
    let startDate = result.accessStartDate;
    let endDate = result.accessEndDate;
    if (isResponse) {
      accessStatus = result.accessStatus === "unblock" ? true : false;
      startDate = new Date(+result.accessStartDate);
      endDate = new Date(+result.accessEndDate);
    } else {
      accessStatus = result.accessStatus ? "unblock" : "block";
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
    if (environment.production) {
      return this._httpWrapperService.get(environment.api_url + "/users");
    } else {
      return this._httpWrapperService.get(
        environment.local_url + "/usermanagement/userList.json"
      );
    }
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
