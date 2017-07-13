import {Component, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {Ticket} from "../ticket.component";

@Component({
    selector: 'image-dialog',
    templateUrl: 'image-dialog.component.html'
})
export class ImageDialogComponent {
    selectedTicket: Ticket;
    constructor(public dialogRef: MdDialogRef<ImageDialogComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
        this.selectedTicket = data;
    }
}