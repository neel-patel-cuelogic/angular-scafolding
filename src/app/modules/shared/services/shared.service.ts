import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public onCustomEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  updateCustomEvent(obj) {
    this.onCustomEvent.next(obj);
  }

  togglePrimaryLoader(value) {
    this.onCustomEvent.next({ event: "togglePrimariLoader", data: value });
  }
}
