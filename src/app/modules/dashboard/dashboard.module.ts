import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { MaterialModule } from "../material/material.module";
import { DashboardService } from "./service/dashboard.service";
import { D3Module } from "../visualization/d3-js/d3.module";

@NgModule({
  declarations: [DashboardComponent, LandingPageComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, D3Module],
  providers: [DashboardService],
})
export class DashboardModule {}
