import {Component, EventEmitter, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Output} from "@angular/compiler/src/core";

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
    onConfirm = new EventEmitter();
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onOk() : void {
        this.dialogRef.close();
        this.onConfirm.emit();
    }
}