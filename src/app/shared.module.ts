import {NgModule} from '@angular/core';
import {LoaderService} from "./loader/loader.service";
import {LoaderComponent} from "./loader/loader.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MdButtonModule, MdRadioModule, MdInputModule, MdCardModule, MdMenuModule,
    MdToolbarModule, MdIconModule, MdSelectModule, MdDatepickerModule, MdNativeDateModule, MdDialogModule, MdTableModule
} from "@angular/material";
import {CdkTableModule} from "@angular/cdk";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        MdCardModule,
        MdToolbarModule,
        MdIconModule,
        MdMenuModule,
        MdInputModule,
        MdButtonModule,
        MdSelectModule,
        MdRadioModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdDialogModule,
        MdTableModule,
        CdkTableModule
    ],
    declarations: [LoaderComponent],
    providers: [
        LoaderService,
    ],
    exports: [FormsModule,
        BrowserModule,
        CommonModule,
        LoaderComponent,
        MdCardModule,
        MdToolbarModule,
        MdIconModule,
        MdMenuModule,
        MdInputModule,
        MdButtonModule,
        MdSelectModule,
        MdRadioModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdDialogModule,
        MdTableModule,
        CdkTableModule]
})
export class SharedModule {}
