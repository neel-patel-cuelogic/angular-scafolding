import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { map } from "rxjs/operators";
import { MatNotificationService } from "src/app/modules/material/services/mat-notification.service";
import { UserStatus } from "src/app/modules/shared/enum/enum";
import { HistoryDialogBoxComponent } from "../../components/history-dialog-box/history-dialog-box.component";
import { UserDialogBoxComponent } from "../../components/user-dialog-box/user-dialog-box.component";
import { ViewUserDialogBoxComponent } from "../../components/view-user-dialog-box/view-user-dialog-box.component";
import { User } from "../../model/user";
import { UserManagementService } from "../../services/user-management.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  get UserStatus() {
    return UserStatus;
  }
  public pageSizeOption = [5, 10, 15, 20];
  public pageSize = 10;
  public displayedColumns = [
    "clientName",
    "requesterName",
    "accessCode",
    "accessStartDate",
    "status",
    "lastLoggedIn",
    "more",
  ];
  public dataSource: MatTableDataSource<User>;
  public filterText = "";
  public selectedRowIndex = -1;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) pageinator: MatPaginator;

  constructor(
    private _userManagementService: UserManagementService,
    private dialog: MatDialog,
    private _notification: MatNotificationService
  ) {}

  ngOnInit() {
    this._userManagementService
      .getUsersList()
      .pipe(
        map((val: any) => {
          return val.hasOwnProperty("data") ? val : { data: val };
        }),
        map((val: any) =>
          val.data.map((v) => this._userManagementService.parseUserObj(v, true))
        )
      )
      .subscribe((list) => {
        this.getUsersList(list);
        this.applyFilter(this.filterText);
      });
  }

  private getUsersList(userList: User[]) {
    this.dataSource = new MatTableDataSource(userList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.pageinator;

    this.dataSource.sortData = (item, sort) => {
      if (sort.active === "accessStartDate") {
        return item.sort((a, b) => {
          let x = 0;
          if (a.accessStartDate > b.accessStartDate) {
            x = 1;
          } else if (
            // a.sessionStartDate.getTime() === b.sessionStartDate.getTime()
            a.accessStartDate === b.accessStartDate
          ) {
            x =
              a.accessEndDate > b.accessEndDate
                ? 1
                : a.accessEndDate < b.accessEndDate
                ? -1
                : x;
          } else {
            x = -1;
          }
          return (
            x *
            (sort.direction === "asc" ? 1 : sort.direction === "desc" ? -1 : 0)
          );
        });
      }

      return item.sort((a, b) => {
        const x =
          a[sort.active] > b[sort.active]
            ? 1
            : a[sort.active] < b[sort.active]
            ? -1
            : 0;
        return (
          x *
          (sort.direction === "asc" ? 1 : sort.direction === "desc" ? -1 : 0)
        );
      });
    };

    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      filter = filter.toLowerCase();
      return (
        data.clientName.toLowerCase().includes(filter) ||
        data.accessCode.toLowerCase().includes(filter) ||
        data.requesterName.toLowerCase().includes(filter)
      );
    };
  }

  public applyFilter(filterValue: string) {
    this.filterText = filterValue.trim();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onUserGenerate() {
    this.openDialog();
  }

  public onUserEditClick(user) {
    this.openDialog(true, user);
  }

  private openDialog(
    isUpdate: boolean = false,
    user: any = null,
    errorMsg: string = ""
  ) {
    const dialogRef = this.dialog.open(UserDialogBoxComponent, {
      data: {
        isUpdate,
        user,
      },
      panelClass: "user-dialog-container",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result:`, result);
      if (result) {
        this._notification.success(result.message);
        this.highlightSelectedRecord(isUpdate ? user : result.data);
      }
      // this.getUsersList();
    });
  }

  public openHistoryDialog(user) {
    this._userManagementService
      .getUserHistory(user.userId)
      .pipe(map((val: any) => val.data))
      .subscribe((list: any) => {
        const dialogRef = this.dialog.open(HistoryDialogBoxComponent, {
          width: "500px",
          height: "500px",
          data: list,
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.highlightSelectedRecord(user);
        });
      });
  }

  public onUserViewClick(user) {
    const dialogRef = this.dialog.open(ViewUserDialogBoxComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.highlightSelectedRecord(user);
    });
  }

  public highlightSelectedRecord(user) {
    this.selectedRowIndex = user.accessCode;
    setTimeout(() => {
      this.selectedRowIndex = -1;
    }, 1000);
  }
}
