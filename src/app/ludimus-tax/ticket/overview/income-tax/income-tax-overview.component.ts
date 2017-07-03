import {Component, Input} from '@angular/core';
import {Ticket} from "../../ticket.component";

@Component({
  selector: 'income-tax-overview',
  templateUrl: './income-tax-overview.component.html'
})
export class IncomeTaxOverviewComponent  {
  @Input()
  tickets: Array<Ticket>;
  @Input()
  getImageBase64: Function;

  constructor() {
  }
}
