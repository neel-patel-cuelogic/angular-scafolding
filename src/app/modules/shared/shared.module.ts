import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrimaryLoaderComponent } from "./components/loaders/primary-loader/primary-loader.component";
import { TableLoaderComponent } from "./components/loaders/table-loader/table-loader.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { SanitizeHtmlPipe } from "./pipes/sanitize-html.pipe";

@NgModule({
  declarations: [
    PrimaryLoaderComponent,
    FileUploadComponent,
    SanitizeHtmlPipe,
    TableLoaderComponent,
  ],
  imports: [CommonModule],
  exports: [PrimaryLoaderComponent, FileUploadComponent],
})
export class SharedModule {}
