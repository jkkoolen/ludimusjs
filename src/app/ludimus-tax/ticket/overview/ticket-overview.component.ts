import {Component, OnInit} from '@angular/core';
import {TicketService} from "../service/ticket.service";
import {Ticket} from "../model/ticket.component";
import {Period} from "../model/period.component";
import {LoaderService} from "../../../loader/loader.service";
import {NotificationService} from "../../../notification/notification.service";
import {DateAdapter, MatDialog, MatDialogConfig} from "@angular/material";
import {ImageDialogComponent} from "./image-dialog.component";
import {TicketDataSource, TicketDatabase} from "./ticket-database";
import {KmrDatabase, KmrDataSource} from "./kmr-database";
import {KmrService} from "../service/kmr.service";
import {ConfirmDialogComponent} from "./confirm-dialog.component";

@Component({
    selector: 'ticket-overview',
    templateUrl: 'ticket-overview.component.html' ,
    providers: [TicketService, KmrService]
})
export class TicketOverviewComponent implements OnInit {
    onSelectCallBack : Function;
    onDeleteCallBack : Function;
    period:Period;
    selectedTicket: Ticket;
    reports =  ['kmr-overview', 'tax', 'tax-overview', 'default'];
    choice: {value: string};
    ticketDatabase = new TicketDatabase(this.ticketService, this.loaderService, this.notificationService);
    ticketDataSource: TicketDataSource | null;
    kmrDatabase = new KmrDatabase(this.kmrService, this.loaderService, this.notificationService);
    kmrDataSource: KmrDataSource | null;
    constructor(private ticketService: TicketService,
                private kmrService: KmrService,
                private loaderService: LoaderService,
                private notificationService: NotificationService,
                public dialog: MatDialog,
                private dateAdapter: DateAdapter<Date>) {
        this.period = new Period();
        this.ticketDataSource = new TicketDataSource(this.ticketDatabase);
        this.kmrDataSource = new KmrDataSource(this.kmrDatabase);
        this.dateAdapter.setLocale('nl');
    }

    set which(value: string) {
        this.choice = {value : value};
        localStorage.setItem('which', this.choice.value);
    }

    get which() : string {
        return this.choice.value;
    }

    ngOnInit(): void {
        this.choice = {value : localStorage.getItem('which') || 'default'};
        this.requestOverviewData();
        this.onSelectCallBack = this.onSelect.bind(this);
        this.onDeleteCallBack = this.onDelete.bind(this);
    }

    onDateChange() {
        this.requestOverviewData();
    }

    requestOverviewData() {
        if(this.choice.value === 'kmr-overview') {
            this.kmrDatabase.requestKmrs(this.period);
        } else {
            this.ticketDatabase.requestTickets(this.period);
        }
    }

    set fromDate(date:Date){
      if(date) {
          this.period.from = date;
      }
    }

    get fromDate(){
        return this.period.range.from;
    }

    set toDate(date:Date) {
      if (date) {
        this.period.to = date;
      }
    }

    get toDate(){
        return this.period.range.to;
    }

     private onSelect(ticket:Ticket) : void {
         console.log('onselect');
         this.selectedTicket = ticket;
      this.ticketService.getTicketImage(ticket.id)
          .subscribe(
              result => {
                  this.readAsFile(result);
              }
          );
    }

    private readAsFile(blob: Blob): void {
        const dialog = this.dialog;
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
            const dialogRef = dialog.open(ImageDialogComponent, <MatDialogConfig>{
                data: reader.result
            });
            dialogRef.afterClosed().subscribe(console.log);
        };
    }

    private onDelete(ticket:Ticket) : void {
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px'
        });
        dialogRef.componentInstance.onConfirm.subscribe(() => {
            this.ticketService.deleteTicket(ticket.id)
                .subscribe(
                    result  => {
                        this.onDateChange();
                    });
        });
    }
}
