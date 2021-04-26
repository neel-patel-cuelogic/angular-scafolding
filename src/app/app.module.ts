import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./modules/core/core.module";
import { LoginModule } from "./modules/login/login.module";
import { ThemingPreviewModule } from "./modules/theming-preview/theming-preview.module";
import { MaterialModule } from "./modules/material/material.module";
import { UserManagementModule } from "./modules/user-management/user-management.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    ThemingPreviewModule,
    AppRoutingModule,
    MaterialModule,
    UserManagementModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
