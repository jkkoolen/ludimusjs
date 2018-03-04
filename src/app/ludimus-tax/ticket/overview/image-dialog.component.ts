import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Ticket} from "../model/ticket.component";

@Component({
    selector: 'image-dialog',
    templateUrl: 'image-dialog.component.html'
})
export class ImageDialogComponent {
    selectedTicket: Ticket;
    constructor(public dialogRef: MatDialogRef<ImageDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.selectedTicket = data;
    }
}