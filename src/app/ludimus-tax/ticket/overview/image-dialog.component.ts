import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'image-dialog',
    templateUrl: 'image-dialog.component.html'
})
export class ImageDialogComponent {
    base64: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.base64 = data;
    }
}