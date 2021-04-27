import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import { ReactiveDatasource } from "src/app/modules/material/utils/reactive-datasource";
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
    "sessionStartDate",
    "status",
    "lastLoggedIn",
    "more",
  ];
  public dataSource: ReactiveDatasource;
  public userList: MatTableDataSource<any>;
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
    const userList$ = this._userManagementService
      .getUsersList()
      .pipe(
        map((val: any) =>
          val.data.map((v) => this._userManagementService.parseUserObj(v, true))
        )
      );
    this.dataSource = new ReactiveDatasource();
    this.dataSource.loadData(userList$);
    console.log(this.dataSource);
  }

  // private getUsersList() {
  //   const res = { data: null };
  //   res.data = [];

  //   this.userList = new MatTableDataSource(res.data);
  //   this.userList.sort = this.sort;
  //   this.userList.paginator = this.pageinator;

  //   this.userList.sortData = (item, sort) => {
  //     if (sort.active === "sessionStartDate") {
  //       return item.sort((a, b) => {
  //         let x = 0;
  //         if (a.sessionStartDate > b.sessionStartDate) {
  //           x = 1;
  //         } else if (
  //           // a.sessionStartDate.getTime() === b.sessionStartDate.getTime()
  //           a.sessionStartDate === b.sessionStartDate
  //         ) {
  //           x =
  //             a.sessionEndDate > b.sessionEndDate
  //               ? 1
  //               : a.sessionEndDate < b.sessionEndDate
  //               ? -1
  //               : x;
  //         } else {
  //           x = -1;
  //         }
  //         return (
  //           x *
  //           (sort.direction === "asc" ? 1 : sort.direction === "desc" ? -1 : 0)
  //         );
  //       });
  //     }

  //     return item.sort((a, b) => {
  //       const x =
  //         a[sort.active] > b[sort.active]
  //           ? 1
  //           : a[sort.active] < b[sort.active]
  //           ? -1
  //           : 0;
  //       return (
  //         x *
  //         (sort.direction === "asc" ? 1 : sort.direction === "desc" ? -1 : 0)
  //       );
  //     });
  //   };

  //   this.userList.filterPredicate = (data, filter: string): boolean => {
  //     filter = filter.toLowerCase();
  //     return (
  //       data.clientName.toLowerCase().includes(filter) ||
  //       data.accessCode.toLowerCase().includes(filter) ||
  //       data.requesterName.toLowerCase().includes(filter)
  //     );
  //   };
  //   this.applyFilter(this.filterText);
  // }

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
    this.userList.filter = filterValue.trim().toLowerCase();

    if (this.userList.filteredData.length === 0) {
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
