import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "../service/admin.service";
import { environment } from "../../../../environments/environment";
import { GoogleAnalyticsService } from "src/app/services/google-analytics.service";
import { GAIndex } from "src/app/shared/enum/enum";

@Component({
  selector: "app-user-dialog-box",
  templateUrl: "./user-dialog-box.component.html",
  styleUrls: ["./user-dialog-box.component.scss"],
})
export class UserDialogBoxComponent implements OnInit {
  public minStartDate: Date;
  public userForm: FormGroup;
  public errorMsg: string;
  isUserFormSubmitted = false;
  showSubmitButton = true;
  generatedAccessCode = "";
  generateResponse = null;
  appURL = environment.app_URL;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogBoxComponent>,
    private _adminService: AdminService,
    private _gaService: GoogleAnalyticsService
  ) {
    const user = { ...(data.user || {}) };
    const today = new Date();
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    this.errorMsg = data.errorMsg;
    this.minStartDate = currentDate;
    if (data.isUpdate) {
      if (currentDate > user.accessStartDate) {
        this.minStartDate = user.accessStartDate;
      }
    }
    this.userForm = formBuilder.group({
      clientName: [user.clientName || "", Validators.required],
      requesterName: [user.requesterName || "", Validators.required],
      accessStartDate: [
        user.accessStartDate || currentDate,
        Validators.required,
      ],
      accessEndDate: [user.accessEndDate, Validators.required],
      accessReason: [user.accessReason || "", Validators.required],
      accessStatus: [
        user.accessStatus !== void 0 ? user.accessStatus : true,
        Validators.nullValidator,
      ],
    });
  }

  ngOnInit() {}

  onUserSave() {
    this.isUserFormSubmitted = true;
    if (this.userForm.invalid) {
      return false;
    }
    const timeZoneOffset = new Date().getTimezoneOffset();
    const user = { ...this.data.user, ...this.userForm.value };
    const requestUser = this._adminService.parseUserObj(
      user,
      false,
      timeZoneOffset
    );
    const GA_config = {};
    GA_config[GAIndex.REQUESTER_NAME] = requestUser.requesterName;
    GA_config[GAIndex.CLIENT_NAME] = requestUser.clientName;

    if (this.data.isUpdate) {
      this._adminService.updateUser(requestUser).subscribe((data: any) => {
        if (data.errorMessage) {
          GA_config[GAIndex.ERROR_REASON] = data.errorMessage;
        }
        this._gaService.triggerEvent(
          "Update",
          "User Management",
          "Update User",
          GA_config
        );
        // console.log('Response of the updateUser', data);
        // if (data.statusCode === 200) {
        if (data) {
          this.dialogRef.close(data);
        } else {
          this.errorMsg = data.errorMessage;
        }
      });
    } else {
      requestUser.role = "guest";
      requestUser.accessStatus = "unblock";
      this._adminService.addUser(requestUser).subscribe((data: any) => {
        if (data.errorMessage) {
          GA_config[GAIndex.ERROR_REASON] = data.errorMessage;
        }
        this._gaService.triggerEvent(
          "Create",
          "User Management",
          "Create User",
          GA_config
        );
        // console.log('Response of the addUser', data);
        // if (data.statusCode === 200) {
        if (data) {
          // this.dialogRef.close(data);
          this.showSubmitButton = false;
          this.generatedAccessCode = data.data.accessCode;
          this.generateResponse = data;
        } else {
          this.errorMsg = data.errorMessage;
        }
      });
    }
  }

  onClose() {
    this.dialogRef.close(this.generateResponse);
  }
}
