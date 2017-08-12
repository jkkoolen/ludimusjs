import {Component, Input, OnDestroy} from '@angular/core';
import {KmrDataSource} from "../kmr-database";

@Component({
  selector: 'kmr-overview',
  templateUrl: './kmr-overview.component.html',
  styleUrls: ['kmr-overview.component.css']
})
export class KmrOverviewComponent implements OnDestroy {
  @Input()
  dataSource: KmrDataSource;
  private currentDay;
  private COLORS = ['#ffaaaa', '#aaffaa'];
  private currentColor = this.COLORS[0];

   ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  getColor(day: number) : string {
      const strippedTimeInMillis = this.stripTime(new Date(day));
      if(strippedTimeInMillis != this.currentDay) {
           this.currentColor = this.COLORS[0] === this.currentColor ? this.COLORS[1] : this.COLORS[0];
       }
       this.currentDay = strippedTimeInMillis;
       return this.currentColor;
  }

  stripTime(date: Date) : number {
       date.setHours(0,0,0,0);
       return date.getTime();
  }
}

