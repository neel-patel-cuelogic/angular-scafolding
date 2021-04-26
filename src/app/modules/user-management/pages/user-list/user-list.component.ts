import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  public displayedColumns = [
    "clientName",
    "requesterName",
    "accessCode",
    "sessionStartDate",
    "status",
    "lastLoggedIn",
    "more",
  ];
  public currentDate = new Date();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) pageinator: MatPaginator;

  public adminForm: FormGroup;
  public userList: MatTableDataSource<any>;
  public UserStatus = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    ACTIVE_BLOCK: "Active (Blocked)",
  };
  public filterText = "";
  public displayNoRecords = false;
  public selectedRowIndex = -1;

  constructor(
    private _router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar // private _authService: AuthService, // private _adminService: AdminService
  ) {}

  ngOnInit() {
    this.getUsersList();
  }

  private getUsersList() {
    // const timeZoneOffset = (new Date()).getTimezoneOffset();
    // this._adminService.getUsersList().subscribe((res: any) => {
    const res = { data: null };
    res.data = [
      {
        userId: 82,
        clientName: "Test",
        requesterName: "PB",
        accessCode: "s5y2xrqt",
        sessionStartDate: "1570645800000",
        sessionEndDate: "1593023399000",
        accessStatus: "unblock",
        accessReason: "PB",
        createdAt: "1570706200000",
        updatedAt: "1592826367000",
        lastLoggedIn: "1592826429000",
        userMetaInfo: {
          ipAddress: "1.23.148.18",
        },
      },
      {
        userId: 96,
        clientName: "shital",
        requesterName: "cuelogic",
        accessCode: "g9scwz3p",
        sessionStartDate: "1575916200000",
        sessionEndDate: "1607538599000",
        accessStatus: "unblock",
        accessReason: "ttt",
        createdAt: "1575964468000",
        updatedAt: "1592457585000",
        lastLoggedIn: "1592569754000",
        userMetaInfo: {
          ipAddress: "157.33.143.120",
        },
      },
      {
        userId: 113,
        clientName: "Sharayu",
        requesterName: "Rahul",
        accessCode: "j5u8qdaf",
        sessionStartDate: "1585852200000",
        sessionEndDate: "1586975399000",
        accessStatus: "unblock",
        accessReason: "Walkthrough",
        createdAt: "1585894967000",
        updatedAt: "1585894967000",
        lastLoggedIn: "1586330144000",
        userMetaInfo: {
          ipAddress: "165.225.124.90",
        },
      },
      {
        userId: 112,
        clientName: "Arushi",
        requesterName: "Rahul",
        accessCode: "8rn9xhl5",
        sessionStartDate: "1585679400000",
        sessionEndDate: "1586975399000",
        accessStatus: "unblock",
        accessReason: "Review field coaching tile",
        createdAt: "1585740953000",
        updatedAt: "1585740953000",
        lastLoggedIn: "1586245013000",
        userMetaInfo: {
          ipAddress: "165.225.124.111",
        },
      },
      {
        userId: 77,
        clientName: "Cuelogic",
        requesterName: "Neel",
        accessCode: "slggjkt8",
        sessionStartDate: "1570127400000",
        sessionEndDate: "1572546599000",
        accessStatus: "unblock",
        accessReason: "Demo",
        createdAt: "1570193214000",
        updatedAt: "1583321472000",
        lastLoggedIn: null,
        userMetaInfo: null,
      },
      {
        userId: 108,
        clientName: "Testing User",
        requesterName: "Cuelogic",
        accessCode: "nh6ei1ge",
        sessionStartDate: "1577644200000",
        sessionEndDate: "1580495399000",
        accessStatus: "unblock",
        accessReason: "Testing User''''''''''''''''s",
        createdAt: "1577699648000",
        updatedAt: "1578996730000",
        lastLoggedIn: null,
        userMetaInfo: null,
      },
      {
        userId: 111,
        clientName: "c1319<script>alert(1)</script>gw8cg",
        requesterName: "ZS",
        accessCode: "268l7jq9",
        sessionStartDate: "1578335400000",
        sessionEndDate: "1578508199000",
        accessStatus: "unblock",
        accessReason: "test",
        createdAt: "1578405086000",
        updatedAt: "1578996628000",
        lastLoggedIn: "1578405126000",
        userMetaInfo: {},
      },
      {
        userId: 109,
        clientName: "cuetestnp",
        requesterName: "cuetestnp",
        accessCode: "r8xi0fnx",
        sessionStartDate: "1577989800000",
        sessionEndDate: "1579717799000",
        accessStatus: "block",
        accessReason: "test",
        createdAt: "1578049274000",
        updatedAt: "1578054393000",
        lastLoggedIn: null,
        userMetaInfo: null,
      },
      {
        userId: 110,
        clientName: "cuetestnp2",
        requesterName: "cuetestnp2",
        accessCode: "prddm8tq",
        sessionStartDate: "1577989800000",
        sessionEndDate: "1580408999000",
        accessStatus: "block",
        accessReason: "sfdsf",
        createdAt: "1578054239000",
        updatedAt: "1578054267000",
        lastLoggedIn: null,
        userMetaInfo: null,
      },
      {
        userId: 100,
        clientName: "Shital",
        requesterName: "Test",
        accessCode: "1s4fb9p3",
        sessionStartDate: "1575916200000",
        sessionEndDate: "1577816999000",
        accessStatus: "unblock",
        accessReason:
          "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ",
        createdAt: "1575965053000",
        updatedAt: "1577108215000",
        lastLoggedIn: "1577108340000",
        userMetaInfo: {
          ipAddress: "14.141.151.78",
        },
      },
      {
        userId: 102,
        clientName: "test",
        requesterName: "test",
        accessCode: "nmbpbys9",
        sessionStartDate: "1575916200000",
        sessionEndDate: "1577816999000",
        accessStatus: "unblock",
        accessReason: "test",
        createdAt: "1575973786000",
        updatedAt: "1577108208000",
        lastLoggedIn: null,
        userMetaInfo: null,
      },
      {
        userId: 103,
        clientName: "Test",
        requesterName: "test",
        accessCode: "hmmgdnwx",
        sessionStartDate: "1575916200000",
        sessionEndDate: "1577298599000",
        accessStatus: "unblock",
        accessReason: "test",
        createdAt: "1575973937000",
        updatedAt: "1577108200000",
        lastLoggedIn: null,
        userMetaInfo: null,
      },
    ];
    // res.data.forEach(v => {
    //   v = this._adminService.parseUserObj(v, true, timeZoneOffset);
    // });

    this.userList = new MatTableDataSource(res.data);
    this.userList.sort = this.sort;
    this.userList.paginator = this.pageinator;

    this.userList.sortData = (item, sort) => {
      if (sort.active === "sessionStartDate") {
        return item.sort((a, b) => {
          let x = 0;
          if (a.sessionStartDate > b.sessionStartDate) {
            x = 1;
          } else if (
            // a.sessionStartDate.getTime() === b.sessionStartDate.getTime()
            a.sessionStartDate === b.sessionStartDate
          ) {
            x =
              a.sessionEndDate > b.sessionEndDate
                ? 1
                : a.sessionEndDate < b.sessionEndDate
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

    this.userList.filterPredicate = (data, filter: string): boolean => {
      filter = filter.toLowerCase();
      return (
        data.clientName.toLowerCase().includes(filter) ||
        data.accessCode.toLowerCase().includes(filter) ||
        data.requesterName.toLowerCase().includes(filter)
      );
      // data.status.toLowerCase().includes(filter);
    };
    this.applyFilter(this.filterText);
    // });
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
