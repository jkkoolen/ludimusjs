import {GoogleFile} from "./googlefile.component";

export class Ticket {
    id: number;
    lastUpdated: Date;
    created: Date;
    ticketDate: Date;
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
    constructor() {
        this.useGoogleDrive = false;
        this.ticketDate = new Date();
        this.income = true;
        this.carcost = false;
        this.vatRate = 21;
        this.forMonth = this.ticketDate.getMonth() > 0 ? this.ticketDate.getMonth() - 1: 11;
    }
}