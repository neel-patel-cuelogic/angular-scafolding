import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "./modules/core/services/auth.service";
import { CookieService } from "./modules/core/services/cookie-wrapper.service";
import { SharedService } from "./modules/shared/services/shared.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  protected _isLoggedIn = false;
  protected _isAdmin = false;
  // protected role = "user";
  protected _isShowPrimaryLoader = false;
  protected _themes = ["primary-theme"];
  protected _currentThemeIndex = 0;
  protected _isDark = false;

  @ViewChild("drawer") drawer: ElementRef;

  get theme(): string {
    return this._themes[this._currentThemeIndex];
  }

  constructor(
    private _renderer: Renderer2,
    private _router: Router,
    private _sharedService: SharedService,
    private _authService: AuthService,
    private _cookieService: CookieService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._renderer.addClass(document.body, this.theme);
    this._renderer.addClass(document.body, this._isDark ? "dark" : "light");

    this._authService.onUserInfoUpate.subscribe((data) => {
      if (data) {
        this._renderer.removeClass(this.document.body, "not-logedin");
        this._isAdmin = data.isAdmin;
        this._isLoggedIn = true;
      } else {
        this._renderer.addClass(this.document.body, "not-logedin");
        this._isAdmin = false;
        this._isLoggedIn = false;
      }
    });
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // if (event.url === "/login") {
        //   this.role = "user";
        // } else if (event.url === "/admin/login") {
        //   this.role = "admin";
        // }
      }

      if (event instanceof NavigationEnd) {
        document.scrollingElement.scrollTo(0, 0);
      }
    });

    this._sharedService.onCustomEvent.subscribe(($e) => {
      // console.log($e);
      switch ($e.event) {
        case "togglePrimariLoader":
          this.togglePrimaryLoader = $e.data;
          break;
        case "addClassToBody":
          this._renderer.addClass(document.body, $e.data);
          break;
        case "removeClassToBody":
          this._renderer.removeClass(document.body, $e.data);
          break;
        case "toastMessage":
          // this._snackBar.open($e.data.message, "", {
          //   duration: $e.data.duration,
          //   panelClass: $e.data.panelClass,
          //   verticalPosition: $e.data.verticalPosition,
          //   horizontalPosition: $e.data.horizontalPosition,
          // });
          break;
      }
    });
  }

  togglePrimaryLoader(value) {
    this._isShowPrimaryLoader = value;
  }

  updateTheme() {
    this._renderer.removeClass(document.body, this._isDark ? "light" : "dark");
    this._renderer.addClass(document.body, this._isDark ? "dark" : "light");
  }

  onLogoutHandler() {
    this._authService.removeUser();
    this._cookieService.clearCloudfrontCookies();
    if (this._isAdmin) {
      this._router.navigate(["admin/login"]);
    } else {
      this._router.navigate(["login"]);
    }
  }
}
