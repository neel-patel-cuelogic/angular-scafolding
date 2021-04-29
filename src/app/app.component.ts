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
import { CustomEventType, NotificationType } from "./modules/shared/enum/enum";
import { AppService } from "./services/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public isLoggedIn = true;
  public isSidePanelOpen = false;
  protected _isAdmin = false;
  public isShowPrimaryLoader = false;
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
  }

  ngOnInit() {
    this._authService.onUserInfoUpate.subscribe((data) => {
      if (data) {
        this._isAdmin = data.isAdmin;
        this.isLoggedIn = true;
      } else {
        this._isAdmin = false;
        this.isLoggedIn = true;
      }
    });
    // this._appService.isSideOpen.subscribe({
    //   complete: null,
    //   error: null,
    //   next: (v) => {
    //     this.isSidePanelOpen = v;
    //   },
    // });

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
        this.isSidePanelOpen = false;
      }
    });

    this._appService.onCustomEvent.subscribe(($e) => {
      // console.log($e);
      switch ($e.event) {
        case CustomEventType.TOGGLE_PRIMARY_LOADER:
          this.togglePrimaryLoader($e.data);
          break;
        case CustomEventType.ADD_CLASS_TO_BODY:
          this._addCustomClass(document.body, $e.data);
          break;
        case CustomEventType.REMOVE_CLASS_TO_BODY:
          this._removeCustomClass(document.body, $e.data);
          break;
        case CustomEventType.SHOW_TOAST_MESSAGE:
          switch ($e.data.type) {
            case NotificationType.SUCCESS:
              this._notification.success($e.data.message);
              break;
            case NotificationType.ERROR:
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
    setTimeout(() => {
      this.isShowPrimaryLoader = value;
    }, 0);
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
