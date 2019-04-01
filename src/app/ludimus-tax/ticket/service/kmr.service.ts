import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from "../../../../environments/environment";
import {Distance, Kmr} from "../kmr/distance.component";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable()
export class KmrService {
    private url = environment.baseUrl + 'ludimus/secure/';  // URL to web API

    constructor (private http: HttpClient) {
    }

    resolve(res: Response) {
        return res.json() || {};
    }

    reject(error: Response|any) {
        if (error.constructor.name === 'TimeoutError') {
            return Observable.throw({code:"TIMEOUT", message: "Response could not be retrieved within the timeout"});
        }
        return Observable.throw( error.json() || {});
    }

    getDistance(origins:string, destinations:string): Observable<Distance> {
        let params = new HttpParams()
            .set('origins', origins)
            .set('destinations', destinations);

        return this.http.get(this.url + 'distance', {params:params})
            .map(this.resolve)
            .catch(this.reject);
    };

    saveDistance(data: Kmr) : Observable<Kmr> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        return this.http.post(this.url + 'addKmr', data, httpOptions)
            .map(this.resolve)
            .catch(this.reject);
    }

    getKmrOverview(from:Date, to:Date): Observable<Kmr[]> {
        let params = new HttpParams()
            .set('from', from.toISOString())
            .set('to', to.toISOString());

        return this.http.get(this.url + 'kmrOverview', {params:params})
            .map(this.resolve)
            .catch(this.reject);
    };
}
