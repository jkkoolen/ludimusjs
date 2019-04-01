import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Ticket} from "../../model/ticket.component";
import {TicketDataSource} from "../ticket-database";
import {TicketService} from "../../service/ticket.service";

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
    images: {} = {};

    constructor(private ticketService: TicketService) {
    }

    ngOnInit(): void {
        this.dataSource.connect().subscribe(object => {
            this.tickets = object;
            this.loadImages();
            this.calculateSummary();
        });
    }

    loadImages() {
        this.tickets.forEach((ticket) => {
            this.ticketService.getTicketImage(ticket.id)
                .subscribe(
                    result => {
                        this.readAsFile(ticket.id, result);
                    }
                );
        });
    }

    get imagesLoaded(): boolean {
        return this.tickets.length === Object.keys(this.images).length;
    }


    private readAsFile(ticketId: number, blob: Blob): void {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            that.images[ticketId] = reader.result;

        };
    }


    calculateSummary(): void {
        this.totalIncome = 0;
        this.tickets.filter((ticket) => ticket.income).forEach((ticket) => {
            this.totalIncome += ticket.price;
        });
        this.totalExpense = 0;
        this.tickets.filter((ticket) => !ticket.income).forEach((ticket) => {
            if (ticket.depreciationYears) {
                this.totalExpense -= (ticket.price * (1 / ticket.depreciationYears));
            } else {
                this.totalExpense -= ticket.price;
            }
        });
    }

    yearPrice(ticket: Ticket): number {
        if (ticket.depreciationYears) {
            return (ticket.price * (1 / ticket.depreciationYears))
        }
        return ticket.price;
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
    }


}
