import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserStatus } from "src/app/modules/shared/enum/enum";

@Component({
  selector: "app-view-user-dialog-box",
  templateUrl: "./view-user-dialog-box.component.html",
  styleUrls: ["./view-user-dialog-box.component.scss"],
})
export class ViewUserDialogBoxComponent implements OnInit {
  get UserStatus() {
    return UserStatus;
  }
  constructor(
    public dialogRef: MatDialogRef<ViewUserDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
