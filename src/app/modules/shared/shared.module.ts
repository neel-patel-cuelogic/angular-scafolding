import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableLoaderComponent } from "./components/loaders/table-loader/table-loader.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { SanitizeHtmlPipe } from "./pipes/sanitize-html.pipe";

@NgModule({
  declarations: [FileUploadComponent, SanitizeHtmlPipe, TableLoaderComponent],
  imports: [CommonModule],
  exports: [FileUploadComponent],
})
export class SharedModule {}
