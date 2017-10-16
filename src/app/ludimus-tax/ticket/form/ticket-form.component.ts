import {Component, OnInit} from '@angular/core';
import {TicketService} from '../service/ticket.service';
import {Ticket} from '../ticket.component';
import {NotificationService} from "../../../notification/notification.service";
import {LoaderService} from "../../../loader/loader.service";
import {DateAdapter} from "@angular/material";

@Component({
    selector: 'ticket-form',
    templateUrl: 'ticket-form.component.html' ,
    providers: [TicketService]
})
export class TicketFormComponent implements OnInit{
    model:Ticket;
    constructor(private ticketService: TicketService,
                private loaderService: LoaderService,
                private notificationService: NotificationService,
                private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('nl');
    }

    ngOnInit(): void {
        this.model  = new Ticket();
    }

    forMonthChanged(value):void {
        this.model.forMonth = value;
    }

    showTaxDepreciation() {
        if(!this.model.income && !this.model.carcost) {
            this.model.yearOfEntry = new Date().getFullYear();
            this.model.depreciationYears = 5;
            return true;
        }
        this.model.yearOfEntry = undefined;
        this.model.depreciationYears = undefined;
        return false;
    }

    monthLabel(month):string {
        switch (month) {
            case '0' : return 'Januari';
            case '1' : return 'Februari';
            case '2' : return 'March';
            case '3' : return 'April';
            case '4' : return 'May';
            case '5' : return 'June';
            case '6' : return 'July';
            case '7' : return 'August';
            case '8' : return 'September';
            case '9' : return 'October';
            case '10' : return 'November';
            default : return 'December';
        }
    }

    onFileChange(fileInput: any){
        let files = fileInput.target.files;
        if(files && files.length === 1) {
            this.model.ticketFilename = fileInput.target.files[0].name;
            let myModel = this.model;

            let reader = new FileReader();
            reader.onload = function() {
                delete myModel.ticketImage;
                // let object = new Uint8Array(this.result);
                // myModel.ticketImage = Object.keys(object).map((key)=>{ return object[key]});
                myModel.ticketImage = this.result;
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    onSubmit(event:Event) {
        event.preventDefault();
        this.loaderService.setVisible(true);
        this.ticketService.addTicket(this.model).
            subscribe(
                ticket  => {
                    this.loaderService.setVisible(false);
                    this.notificationService.success("Invoice stored successfull");
                    this.model = new Ticket();
                },
                error =>  {
                    this.loaderService.setVisible(false);
                    this.notificationService.danger(JSON.stringify(error));
                });
        return true;
    }
}
