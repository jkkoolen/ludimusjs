import { Injectable } from '@angular/core';
import {Ticket} from "../ticket.component";
import {Headers, RequestOptions, Response, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthHttp} from "angular2-jwt";
import {environment} from "../../../../environments/environment";


@Injectable()
export class TicketService {
    private url = environment.baseUrl + 'ludimus/';  // URL to web API
    private TIMEOUT = 10000;

    constructor (private authHttp: AuthHttp) {
      window.console.log('url from environment is ', this.url);
    }

    resolve(res: Response) {
        return res.json() || {};
    }

    reject(error: Response|any) {
        if (error.constructor.name === 'TimeoutError') {
            return Observable.throw({error:"TIMEOUT_ERROR"});
        }
        return Observable.throw( error.json() || {});
    }

    getTickets(from:Date, to:Date): Observable<Ticket[]> {
        let params = new URLSearchParams();
        params.set('from', from.toISOString());
        params.set('to', to.toISOString());

        return this.authHttp.get(this.url + 'overview', {search:params})
            .timeout(this.TIMEOUT)
            .map(this.resolve)
            .catch(this.reject);
    };

    addTicket (ticket: Ticket): Observable<Ticket> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.url + 'addTicket', ticket, options)
            .timeout(this.TIMEOUT)
            .map(this.resolve)
            .catch(this.reject);
    }
}
