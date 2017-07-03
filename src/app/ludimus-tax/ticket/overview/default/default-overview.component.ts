import {Component, Input} from '@angular/core';
import {Ticket} from "../../ticket.component";

@Component({
  selector: 'default-overview',
  templateUrl: './default-overview.component.html'
})
export class DefaultOverviewComponent {
  @Input()
  tickets: Array<Ticket>;
  @Input()
  onSelect: Function;

  constructor() { }

}
