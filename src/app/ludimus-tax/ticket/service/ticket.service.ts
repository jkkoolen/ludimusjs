import { Injectable } from '@angular/core';
import {Ticket} from "../model/ticket.component";
import {GoogleFile} from "../model/googlefile.component";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from "../../../../environments/environment";
import {DatePipe} from "@angular/common";
import {JKDriveFile} from "../model/jkdrivefile.component";

const DATE_FORMAT: string = 'yyyy-MM-dd';

@Injectable()
export class TicketService {
    private url = environment.baseUrl + 'ludimus/secure/';  // URL to web API

    constructor (private http: HttpClient, private datePipe : DatePipe) {
      window.console.log('url from environment is ', this.url);
    }

    resolve(res: Response) {
        return res || {};
    }

    reject(error: Response|any) {
        if (error.constructor.name === 'TimeoutError') {
            return Observable.throw({code: "TIMEOUT", message: "Response could not be retrieved within the timeout"});
        }
        return Observable.throw( error || {message: "Unkown Error!"});
    }

    getTickets(from:Date, to:Date): Observable<Ticket[]> {
        let params = new HttpParams()
            .set('from', this.datePipe.transform(from, DATE_FORMAT))
            .set('to', this.datePipe.transform(to, DATE_FORMAT));
        return this.http.get(this.url + 'overview', {params:params})
            .map(this.resolve)
            .catch(this.reject);
    };

    addTicket (ticket: Ticket): Observable<Ticket> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        return this.http.post(this.url + 'addTicket', ticket, httpOptions)
            .map(this.resolve)
            .catch(this.reject);
    }

    deleteTicket(ticketId: number) : Observable<Boolean> {
        let params = new HttpParams()
            .set('ticketId', '' + ticketId);
        return this.http.delete(this.url + 'deleteTicket', {params:params})
            .map(this.resolve)
            .catch(this.reject);
    }

    getTicketImage(ticketId: number) : Observable<Blob> {
        console.log('getTicketImage');
        let params = new HttpParams()
            .set("ticketId", '' + ticketId);
        return this.http.get(this.url + 'ticketImage', {params:params, responseType: 'blob'})
            .catch(this.reject);
    }

    getFilesUploadedInTheLast7Days(): Observable<GoogleFile[]> {
        let params = new HttpParams()
            .set('dayCount', '7');
        return this.http.get(this.url + 'getFilesUploadedInTheLastNDays', {params: params})
            .map(this.resolve)
            .catch(this.reject);
    }

    getJKDriveFiles(): Observable<JKDriveFile[]> {
        return this.http.get(this.url + 'getJKDriveFiles')
            .map(this.resolve)
            .catch(this.reject);
    }


    tesseract(fileDownloadUri: string): Observable<string> {
        let params = new HttpParams()
            .set('url', fileDownloadUri);
        return this.http.get(this.url + 'tesseract' , {params: params})
            .map(this.resolve)
            .catch(this.reject);
    }
}
