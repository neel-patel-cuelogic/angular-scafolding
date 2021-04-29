import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CustomEventType } from "../modules/shared/enum/enum";
@Injectable({
  providedIn: "root",
})
export class AppService {
  public onCustomEvent: EventEmitter<any> = new EventEmitter<any>();
  public isSideOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public widgetLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  updateCustomEvent(obj) {
    this.onCustomEvent.next(obj);
  }

  togglePrimaryLoader(value) {
    this.onCustomEvent.next({
      event: CustomEventType.TOGGLE_PRIMARY_LOADER,
      data: value,
    });
  }

  setSidePanelStatus(value: boolean) {
    this.isSideOpen.next(value);
  }
}
