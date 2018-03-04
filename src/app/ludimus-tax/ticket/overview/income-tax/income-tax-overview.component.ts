import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Ticket} from "../../model/ticket.component";
import {TicketDataSource} from "../ticket-database";

@Component({
  selector: 'income-tax-overview',
  styleUrls: ['./income-tax-overview.component.css'],
  templateUrl: './income-tax-overview.component.html'
})
export class IncomeTaxOverviewComponent implements OnInit, OnDestroy {
  tickets: Array<Ticket>;
  @Input()
  dataSource: TicketDataSource;
  totalIncome: number;
  totalExpense: number;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.connect().subscribe(object=>{
      this.tickets = object;
      this.calculateSummary();
    });
  }

  calculateSummary():void {
    this.totalIncome = 0;
    this.tickets.filter((ticket) => ticket.income).forEach((ticket) => {
        this.totalIncome += ticket.price;
    });
    this.totalExpense = 0;
    this.tickets.filter((ticket) => !ticket.income).forEach((ticket) => {
        if(ticket.depreciationYears) {
            this.totalExpense -= (ticket.price * (1 / ticket.depreciationYears));
        } else {
            this.totalExpense -= ticket.price;
        }
    });
  }

  yearPrice(ticket: Ticket): number {
    if(ticket.depreciationYears) {
      return (ticket.price * (1 / ticket.depreciationYears))
    }
    return ticket.price;
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }


}
