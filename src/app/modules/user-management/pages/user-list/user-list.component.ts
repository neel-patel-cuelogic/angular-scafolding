import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";
import { UserStatus } from "src/app/modules/shared/enum/enum";
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
  public displayNoRecords = false;
  public selectedRowIndex = -1;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) pageinator: MatPaginator;

  constructor(
    private _router: Router,
    private _userManagementService: UserManagementService,
    private dialog: MatDialog // private _notification: MatNotificationService
  ) {}

  ngOnInit() {
    this._userManagementService
      .getUsersList()
      .pipe(
        map((val: any) =>
          val.data.map((v) => this._userManagementService.parseUserObj(v, true))
        )
      )
      .subscribe((list) => this.getUsersList(list));
    // this.dataSource = new ReactiveDatasource();
    // this.dataSource.loadData(userList$);
    // console.log(this.dataSource);
  }

  private getUsersList(userList) {
    const res = { data: null };
    res.data = [];

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
    this.applyFilter(this.filterText);
  }

  private openDialog(
    isUpdate: boolean = false,
    user: any = null,
    errorMsg: string = ""
  ) {
    // const dialogRef = this.dialog.open(UserDialogBoxComponent, {
    //   data: {
    //     isUpdate,
    //     user
    //   },
    //   panelClass: 'user-dialog-container',
    //   disableClose: true
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result:`, result);
    //   if (result) {
    //     // Close on click of save or update user button.
    //     this._snackBar.open(result.message, '', {
    //       duration: 3000,
    //       panelClass: 'success',
    //       verticalPosition: 'top',
    //       horizontalPosition: 'right'
    //     });
    //     this.highlightSelectedRecord(isUpdate ? user : result.data);
    //   }
    //   this.getUsersList();
    // });
  }

  openHistoryDialog(user) {
    // const dialogRef = this.dialog.open(HistoryDialogBoxComponent, {
    //   width: '500px',
    //   height: '500px',
    //   data: user.userId
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.highlightSelectedRecord(user);
    // });
  }

  openLockoutDialog() {
    // this.dialog.open(LockoutDialogBoxComponent, {
    //   width: '800px',
    // });
  }

  public applyFilter(filterValue: string) {
    this.filterText = filterValue.trim();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.filteredData.length === 0) {
      this.displayNoRecords = true;
    } else {
      this.displayNoRecords = false;
    }
  }

  onUserGenerate() {
    this.openDialog();
  }

  onUserEditClick(user) {
    this.openDialog(true, user);
  }

  onUserViewClick(user) {
    // const dialogRef = this.dialog.open(ViewUserDialogBoxComponent, {
    //   data: user
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.highlightSelectedRecord(user);
    // });
  }

  highlightSelectedRecord(user) {
    this.selectedRowIndex = user.accessCode;
    setTimeout(() => {
      this.selectedRowIndex = -1;
    }, 1000);
  }
}
