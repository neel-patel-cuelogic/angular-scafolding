import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { first } from "rxjs/operators";
import { AppService } from "src/app/services/app.service";
import {
  animateText,
  onLeftSidePanelChange,
} from "../../animations/left-side-panel-animation";

@Component({
  selector: "app-left-nav-bar",
  templateUrl: "./left-nav-bar.component.html",
  styleUrls: ["./left-nav-bar.component.scss"],
  animations: [onLeftSidePanelChange, animateText],
})
export class LeftNavBarComponent implements OnInit {
  public panelState: boolean = false;
  public menuText: boolean = false;
  @Output()
  toggleLeftSidePanelStateEmmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _appService: AppService) {}

  ngOnInit(): void {
    this._appService.isLeftSidePanelOpen$
      .pipe(first())
      .subscribe((v: boolean) => {
        this.panelState = v;
        setTimeout(() => {
          this.menuText = this.panelState;
        }, 200);
        console.log(this.panelState);
      });
  }

  togglePanel() {
    this.panelState = !this.panelState;
    setTimeout(() => {
      this.menuText = this.panelState;
    }, 200);
    this.toggleLeftSidePanelStateEmmit.emit(this.panelState);
  }
}
