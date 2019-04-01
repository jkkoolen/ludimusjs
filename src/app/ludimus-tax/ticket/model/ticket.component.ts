import {GoogleFile} from "./googlefile.component";
import {DatePipe} from "@angular/common";
import {JKDriveFile} from "./jkdrivefile.component";

const DATE_FORMAT: string = 'yyyy-MM-dd';

export class Ticket {
    id: number;
    ticketDate: string;
    invoiceNumber: string;
    description: string;
    price: number;
    vatRate: number;
    ticketFilename: string;
    ticketImage: any;
    income: boolean;
    carcost: boolean;
    forMonth: number;
    depreciationYears: number;
    yearOfEntry: number;
    useGoogleDrive: boolean;
    googleFile: GoogleFile;
    useJKDrive: boolean;
    jkdriveFile: JKDriveFile;

    constructor(private datePipe : DatePipe) {
        this.useJKDrive = false;
        this.useGoogleDrive = false;
        const date = new Date();
        this.ticketDate = datePipe.transform(date, DATE_FORMAT);
        this.income = true;
        this.carcost = false;
        this.vatRate = 21;
        this.forMonth = date.getMonth() > 0 ? date.getMonth() - 1: 11;
    }
}
