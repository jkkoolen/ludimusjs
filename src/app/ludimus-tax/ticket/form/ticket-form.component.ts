import {Component, OnInit} from '@angular/core';
import {TicketService} from '../service/ticket.service';
import {Ticket} from '../model/ticket.component';
import {NotificationService} from "../../../notification/notification.service";
import {LoaderService} from "../../../loader/loader.service";
import {DateAdapter, MatCheckboxChange, MatSelectChange} from "@angular/material";
import {GoogleFile} from "../model/googlefile.component";
import {DatePipe} from "@angular/common";
import {JKDriveFile} from "../model/jkdrivefile.component";

const DATE_FORMAT: string = 'yyyy-MM-dd';

@Component({
    selector: 'ticket-form',
    templateUrl: 'ticket-form.component.html' ,
    providers: [TicketService]
})
export class TicketFormComponent implements OnInit{
    googlefiles: GoogleFile[];
    jkdrivefiles: JKDriveFile[];
    ticketAsText: string;
    model:Ticket;
    ticketDate: Date;
    constructor(private ticketService: TicketService,
                private loaderService: LoaderService,
                private notificationService: NotificationService,
                private dateAdapter: DateAdapter<Date>,
                private datePipe : DatePipe) {
        this.dateAdapter.setLocale('nl');
    }

    ngOnInit(): void {
        this.resetModel();
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
        this.model.ticketDate = this.datePipe.transform(this.ticketDate, DATE_FORMAT);
        this.loaderService.setVisible(true);
        this.ticketService.addTicket(this.model).
            subscribe(
                ticket  => {
                    this.loaderService.setVisible(false);
                    this.notificationService.success("Invoice stored successfull");
                    this.resetModel();
                },
                error =>  {
                    this.loaderService.setVisible(false);
                    this.notificationService.danger('Error occured : ' + error.message);
                });
        return true;
    }

    onGoogleDriveChange($event: MatCheckboxChange) {
        if($event.checked) {
            this.model.useJKDrive = false;
            this.loaderService.setVisible(true);
            this.ticketService.getFilesUploadedInTheLast7Days().subscribe(
                 result =>  {
                     this.loaderService.setVisible(false);
                     this.googlefiles = result;
                 }, error => {
                    this.loaderService.setVisible(false);
                    this.notificationService.danger(error.message);
                })
        }
    }

    onJKDriveChange($event: MatCheckboxChange) {
        if($event.checked) {
            this.model.useGoogleDrive = false;
            this.loaderService.setVisible(true);
            this.ticketService.getJKDriveFiles().subscribe(
                result =>  {
                    this.loaderService.setVisible(false);
                    this.jkdrivefiles = result;
                }, error => {
                    this.loaderService.setVisible(false);
                    this.notificationService.danger(error.message);
                })

        }
    }

    resetModel() {
        this.model  = new Ticket(this.datePipe);
    }

    onJKDriveFileChange($event: JKDriveFile) {
        this.loaderService.setVisible(true);
        this.ticketService.tesseract($event.fileDownloadUri).subscribe(
            result => {
                this.loaderService.setVisible(false);
                this.ticketAsText = result;
                console.log(this.ticketAsText);
            }, error => {
                this.loaderService.setVisible(false);
                this.notificationService.danger(error.message);
            })

    }
}
