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
import { AuthService } from "./modules/core/auth/auth.service";
import { MatNotificationService } from "./modules/material/services/mat-notification.service";
import { AppService } from "./services/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public isSidePanelOpen = false;
  protected _isAdmin = false;
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
    private _appService: AppService,
    private _authService: AuthService,
    private _notification: MatNotificationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._addCustomClass(document.body, this.theme);
    this._addCustomClass(document.body, this._isDark ? "dark" : "light");

    this._authService.onUserInfoUpate.subscribe((data) => {
      if (data) {
        this._isAdmin = data.isAdmin;
        this.isLoggedIn = true;
      } else {
        this._isAdmin = false;
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit() {
    this._appService.isSideOpen.subscribe({
      complete: null,
      error: null,
      next: (v) => {
        this.isSidePanelOpen = v;
      },
    });

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isSidePanelOpen = false;
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

    this._appService.onCustomEvent.subscribe(($e) => {
      // console.log($e);
      switch ($e.event) {
        case "togglePrimaryLoader":
          this.togglePrimaryLoader = $e.data;
          break;
        case "addClassToBody":
          this._addCustomClass(document.body, $e.data);
          break;
        case "removeClassToBody":
          this._removeCustomClass(document.body, $e.data);
          break;
        case "toastMessage":
          switch ($e.data.panelClass) {
            case "success":
              this._notification.success($e.data.message);
              break;
            case "error":
              this._notification.error($e.data.message);
              break;
            default:
              this._notification.default($e.data.message);
              break;
          }
          break;
      }
    });
  }

  onDrawerOpen() {
    this._appService.setSidePanelStatus(true);
  }
  onDrawerClose() {
    this._appService.setSidePanelStatus(false);
  }

  togglePrimaryLoader(value) {
    this._isShowPrimaryLoader = value;
  }

  updateTheme() {
    this._removeCustomClass(document.body, this._isDark ? "light" : "dark");
    this._addCustomClass(document.body, this._isDark ? "dark" : "light");
  }

  private _addCustomClass(el, className) {
    this._renderer.addClass(el, className);
  }
  private _removeCustomClass(el, className) {
    this._renderer.removeClass(el, className);
  }
}
