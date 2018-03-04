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

@Component({
    selector: 'ticket-overview',
    templateUrl: 'ticket-overview.component.html' ,
    providers: [TicketService, KmrService]
})
export class TicketOverviewComponent implements OnInit {
    onSelectCallBack : Function;
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
        this.ticketDatabase.requestTickets(this.period);
        this.kmrDatabase.requestKmrs(this.period);
        this.choice = {value : localStorage.getItem('which') || 'default'};
        this.onSelectCallBack = this.onSelect.bind(this);
    }

    onDateChange(newValue) {
        this.ticketDatabase.requestTickets(this.period);
        this.kmrDatabase.requestKmrs(this.period);
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
      this.selectedTicket = ticket;
      if (this.selectedTicket.ticketImage) {
          var dialogRef = this.dialog.open(ImageDialogComponent, <MatDialogConfig>{
              data: this.selectedTicket
          });
          dialogRef.afterClosed().subscribe(console.log);
      }
    }
}
