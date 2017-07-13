import {Component, Input, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {TicketDataSource} from "../ticket-database";
import {Ticket} from "../../ticket.component";

@Component({
  selector: 'tax-overview',
  templateUrl: './tax-overview.component.html'
})
export class TaxOverviewComponent implements OnInit, OnDestroy {
  @Input()
  dataSource: TicketDataSource;
  tickets: Array<Ticket>;
  results: {debit21: number, credit21: number,
            debit6: number, credit6: number,
            debit0: number, credit0: number};

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.connect().subscribe(object=>{
      this.tickets = object;
      this.setResults();
    });
  }
  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }


  private setResults() : void {
    this.results = {debit21 : this.getDebit(21), credit21 : this.getCredit(21),
                    debit6 :  this.getDebit(6), credit6 : this.getCredit(6),
                    debit0 :  this.getDebit(0), credit0 : this.getCredit(0)};
  }

  private getDebit(value: number):number {
    var total = 0;
    this.tickets.filter(ticket => {return ticket.vatRate === value && ticket.income}).forEach((item => total += item.price));
    return total;
  }

  private getCredit(value: number):number {
    var total = 0;
    this.tickets.filter(ticket => {return ticket.vatRate === value && !ticket.income}).forEach((item => total += item.price));
    return total;
  }

  getDebitTotal() : number {
    return this.results.debit21 + this.results.debit6 + this.results.debit0;
  }

  getCreditTotal() : number {
    return this.results.credit21 + this.results.credit6 + this.results.credit0;
  }
}
