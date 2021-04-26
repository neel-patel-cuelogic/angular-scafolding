import {
  Component,
  OnInit,
  Renderer2,
  Inject,
  Output,
  EventEmitter,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { CoreService } from "../../services/core.service";
import { CookieService } from "../../services/cookie-wrapper.service";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Output() toggleDrawerEmmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() logoutEmmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _authService: AuthService,
    private _coreService: CoreService
  ) {}

  ngOnInit() {}

  onToggleDrawerClick() {
    this.toggleDrawerEmmit.emit();
  }

  logout() {
    this._coreService.logout(this._authService.getUserId()).toPromise();
    this.logoutEmmit.emit();
  }
}
