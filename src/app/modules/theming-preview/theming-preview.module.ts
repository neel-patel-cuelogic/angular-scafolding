import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemingPreviewRoutingModule } from "./theming-routing.module";
import { ThemingPreviewComponent } from "./theming-preview.component";
import { PreviewComponentsComponent } from "./pages/preview-components/preview-components.component";
import { MaterialModule } from "../material/material.module";
import { ThemingPreviewService } from "./service/theming-preview.service";

@NgModule({
  declarations: [ThemingPreviewComponent, PreviewComponentsComponent],
  imports: [CommonModule, ThemingPreviewRoutingModule, MaterialModule],
  providers: [ThemingPreviewService],
})
export class ThemingPreviewModule {}
