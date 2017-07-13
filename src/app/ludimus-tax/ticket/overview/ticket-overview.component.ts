import {Component, OnInit} from '@angular/core';
import {TicketService} from "../service/ticket.service";
import {Ticket} from "../ticket.component";
import {Period} from "../period.component";
import {LoaderService} from "../../../loader/loader.service";
import {NotificationService} from "../../../notification/notification.service";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ImageDialogComponent} from "./image-dialog.component";
import {TicketDataSource, TicketDatabase} from "./ticket-database";

@Component({
    selector: 'ticket-overview',
    templateUrl: 'ticket-overview.component.html' ,
    providers: [TicketService]
})
export class TicketOverviewComponent implements OnInit {
    period:Period;
    selectedTicket: Ticket;
    reports =  ['tax', 'tax-overview', 'default'];
    which: {value: string};
    ticketDatabase = new TicketDatabase(this.ticketService, this.loaderService, this.notificationService);
    dataSource: TicketDataSource | null;
    constructor(private ticketService: TicketService,
                private loaderService: LoaderService,
                private notificationService: NotificationService,
                public dialog: MdDialog) {
        this.period = new Period();
        this.dataSource = new TicketDataSource(this.ticketDatabase);
    }

    ngOnInit(): void {
        this.ticketDatabase.requestTickets(this.period);
        this.which = {value : 'default'};
    }

    onDateChange(newValue) {
        this.ticketDatabase.requestTickets(this.period);
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

    onSelect(ticket:Ticket) : void {
      this.selectedTicket = ticket;
      if (this.selectedTicket.ticketImage) {
          var dialogRef = this.dialog.open(ImageDialogComponent, <MdDialogConfig>{
              data: this.selectedTicket
          });
          dialogRef.afterClosed().subscribe(console.log);
      }
    }
}
