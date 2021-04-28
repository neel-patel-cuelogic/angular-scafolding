import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CoreService } from "./services/core.service";
import { LeftNavBarComponent } from "./components/left-nav-bar/left-nav-bar.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LeftNavBarComponent,
    DrawerComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, MaterialModule],
  providers: [CoreService],
  exports: [
    LeftNavBarComponent,
    HeaderComponent,
    FooterComponent,
    DrawerComponent,
  ],
})
export class CoreModule {}
