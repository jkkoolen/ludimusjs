import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild
}                           from '@angular/router';
import {Observable} from "rxjs";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {tokenNotExpired} from 'angular2-jwt';
import {environment} from "../../environments/environment";

import {Headers, RequestOptions, Response, Http} from "@angular/http";
import {Login} from "./login/login.component";
import {NotificationService} from "../notification/notification.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  private url = environment.baseUrl + 'ludimus/';  // URL to web API
  private redirectUrl:string;
  constructor(private http: Http,
              private router: Router,
              private notificationService:NotificationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
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

  login (login: Login): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'login', login, options)
        .timeout(8000)
        .map(this.resolve)
        .catch(this.reject);
  }

  logout() {
    localStorage.removeItem('id_token');
  };

  isLoggedIn() {
    let notExpired = tokenNotExpired();
    if(notExpired) {
      return true;
    }
    this.notificationService.info('Your login period has been expired, you have to login!');
    this.logout();
  }

  redirect() {
    this.router.navigate([this.redirectUrl]);
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['login']);
    return false;
  }
}
