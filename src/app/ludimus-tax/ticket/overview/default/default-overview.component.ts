import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TicketDataSource} from "../ticket-database";
import {setInterval} from "timers";

@Component({
  selector: 'default-overview',
  templateUrl: './default-overview.component.html',
  styleUrls: ['default-overview.component.css']
})
export class DefaultOverviewComponent implements OnDestroy {
  @Input()
  onSelect: Function;
  @Input()
  dataSource: TicketDataSource;

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }
}

