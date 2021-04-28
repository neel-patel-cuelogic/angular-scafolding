import {
  Component,
  OnInit,
  Renderer2,
  Inject,
  Output,
  EventEmitter,
} from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { AppService } from "src/app/services/app.service";
import { CoreService } from "../../services/core.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public isDrawerOpen: boolean;
  @Output() toggleDrawerEmmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _authService: AuthService,
    private _coreService: CoreService,
    private _router: Router,
    private _appService: AppService
  ) {}

  ngOnInit() {
    this._appService.isSideOpen.subscribe((v: boolean) => {
      this.isDrawerOpen = v;
      console.log(this.isDrawerOpen);
    });
  }

  onToggleDrawerClick() {
    this.isDrawerOpen = true;
    this.toggleDrawerEmmit.emit(this.isDrawerOpen);
  }

  logout() {
    this._coreService.logout(this._authService.getUserId()).toPromise();
    this._authService.removeUser();

    // if (this._isAdmin) {
    //   this._router.navigate(["admin/login"]);
    // } else {
    //   this._router.navigate(["login"]);
    // }
  }
}
