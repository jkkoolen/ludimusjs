import {Component, OnInit} from '@angular/core';
import {TicketService} from "../service/ticket.service";
import {Ticket} from "../ticket.component";
import {Period} from "../period.component";

@Component({
    selector: 'ticket-overview',
    templateUrl: 'ticket-overview.component.html' ,
    providers: [TicketService]
})
export class TicketOverviewComponent implements OnInit {
    tickets: Ticket[];
    period:Period;
    selectedTicket: Ticket;
    which: {value: string};
    constructor(private ticketService: TicketService) {
        this.period = new Period();
    }
    ngOnInit(): void {
        this.requestTickets();
        this.which = {value : 'default'};
    }

    onChange(newValue) {
      this.requestTickets();
    }

    requestTickets():void {
          this.ticketService.getTickets(this.period.range.from, this.period.range.to).subscribe(
              tickets => {this.tickets = tickets},
              error => {
                  console.log(error)
              });
    }

    set fromDate(e:string){
      if(e) {
        let splitted = e.split('-');
        this.period.from = new Date(Date.UTC(Number(splitted[0]), Number(splitted[1]) - 1, Number(splitted[2])));
      }
    }

    get fromDate(){
        return this.period.range.from.toISOString().substring(0, 10);
    }

    set toDate(e:string) {
      if (e) {
        let splitted = e.split('-');
        this.period.to = new Date(Date.UTC(Number(splitted[0]), Number(splitted[1]) - 1, Number(splitted[2])));
      }
    }

    get toDate(){
        return this.period.range.to.toISOString().substring(0, 10);
    }

    onSelect(ticket:Ticket) : void {
      this.selectedTicket = ticket;
      if (this.selectedTicket.ticketImage) {
        document.querySelector('#myModal').setAttribute('style', 'display:block');
      }
    }

    doClose() :void {
      document.querySelector('#myModal').setAttribute('style', 'display:none');
    }

    getImageBase64(data:any): string {
        return 'data:image/jpg;base64,' + data;
    }
}
