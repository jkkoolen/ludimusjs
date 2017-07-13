import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Ticket} from "../../ticket.component";
import {TicketDataSource} from "../ticket-database";

@Component({
  selector: 'income-tax-overview',
  templateUrl: './income-tax-overview.component.html'
})
export class IncomeTaxOverviewComponent implements OnInit, OnDestroy {
  tickets: Array<Ticket>;
  @Input()
  dataSource: TicketDataSource;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.connect().subscribe(object=>{
      this.tickets = object;
    });
  }
  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }
}
