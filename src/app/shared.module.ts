import {NgModule} from '@angular/core';
import {LoaderService} from "./loader/loader.service";
import {LoaderComponent} from "./loader/loader.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatRadioModule, MatInputModule, MatCardModule, MatMenuModule,
    MatToolbarModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatTableModule, MatCheckboxModule
} from "@angular/material";
import {CdkTableModule} from '@angular/cdk/table';
import {TimeoutInterceptor} from "./ludimus-tax/ticket/service/timeout.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        CommonModule,
        NoopAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatTableModule,
        CdkTableModule,
        MatCheckboxModule
    ],
    declarations: [LoaderComponent],
    providers: [
        [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
        LoaderService,
    ],
    exports: [FormsModule,
        BrowserModule,
        CommonModule,
        LoaderComponent,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatTableModule,
        CdkTableModule,
        MatCheckboxModule]
})
export class SharedModule {}
