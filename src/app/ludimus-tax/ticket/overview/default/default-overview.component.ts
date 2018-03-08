import {Component, Input, OnDestroy} from '@angular/core';
import {TicketDataSource} from "../ticket-database";

@Component({
  selector: 'default-overview',
  templateUrl: './default-overview.component.html',
  styleUrls: ['default-overview.component.css']
})
export class DefaultOverviewComponent implements OnDestroy {
  @Input()
  onSelect: Function;
  @Input()
  onDelete: Function;
  @Input()
  dataSource: TicketDataSource;

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }
}

