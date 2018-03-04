import { Injectable } from '@angular/core';
import {Ticket} from "../model/ticket.component";
import {GoogleFile} from "../model/googlefile.component";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from "../../../../environments/environment";


@Injectable()
export class TicketService {
    private url = environment.baseUrl + 'ludimus/';  // URL to web API

    constructor (private http: HttpClient) {
      window.console.log('url from environment is ', this.url);
    }

    resolve(res: Response) {
        return res || {};
    }

    reject(error: Response|any) {
        if (error.constructor.name === 'TimeoutError') {
            return Observable.throw({code:"TIMEOUT", message: "Response could not be retrieved within the timeout"});
        }
        return Observable.throw( error || {});
    }

    getTickets(from:Date, to:Date): Observable<Ticket[]> {
        let params = new HttpParams()
            .set('from', from.toISOString())
            .set('to', to.toISOString());
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

    getFilesUploadedInTheLast7Days(): Observable<GoogleFile[]> {
        let params = new HttpParams()
            .set('dayCount', '7');
        return this.http.get(this.url + 'getFilesUploadedInTheLastNDays', {params: params})
            .map(this.resolve)
            .catch(this.reject);

    }

}
