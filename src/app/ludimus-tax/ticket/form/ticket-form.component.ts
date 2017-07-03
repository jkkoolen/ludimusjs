import {Component} from '@angular/core';
import {TicketService} from '../service/ticket.service';
import {Ticket} from '../ticket.component';
import {NotificationService} from "../../../notification/notification.service";

@Component({
    selector: 'ticket-form',
    templateUrl: 'ticket-form.component.html' ,
    styleUrls:['ticket-form.component.css'],
    providers: [TicketService]
})
export class TicketFormComponent {
    model = new Ticket();
    constructor(private ticketService: TicketService,
      private notificationService: NotificationService) {

    }

    set ticketDate(e:string){
        let splitted = e.split('-');
        this.model.ticketDate = new Date(Date.UTC(Number(splitted[0]), Number(splitted[1])-1, Number(splitted[2])));
    }

    get ticketDate(){
        return this.model.ticketDate.toISOString().substring(0, 10);
    }

    forMonthChanged():void {
        this.model.forMonth = Number(this.model.forMonth);
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
        this.ticketService.addTicket(this.model).
            subscribe(
                ticket  => {this.notificationService.success("Invoice stored successfull"); this.model = new Ticket();},
                error =>  {this.notificationService.danger(error)});
        return true;
    }
}
