import {BehaviorSubject, Observable} from "rxjs";
import {Ticket} from "../model/ticket.component";
import {TicketService} from "../service/ticket.service";
import {Period} from "../model/period.component";
import {LoaderService} from "../../../loader/loader.service";
import {NotificationService} from "../../../notification/notification.service";
import {DataSource} from "@angular/cdk/collections";

export class TicketDatabase {
    dataChange: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
    get data(): Ticket[] { return this.dataChange.value; }

    constructor(private ticketService: TicketService,
                private loaderService: LoaderService,
                private notificationService: NotificationService) {
    }

    requestTickets(period: Period) {
        this.loaderService.setVisible(true);
        this.ticketService.getTickets(period.range.from, period.range.to).subscribe(
            tickets => {
                this.dataChange.next(tickets);
                this.loaderService.setVisible(false);
            },
            error => {
                this.loaderService.setVisible(false);
                this.notificationService.danger(error.code);
            });
    }
}

export class TicketDataSource extends DataSource<Ticket> {
    constructor(private _ticketDatabase: TicketDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Ticket[]> {
        return this._ticketDatabase.dataChange;
    }

    disconnect() {}
}