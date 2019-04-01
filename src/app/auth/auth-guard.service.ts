import {Injectable} from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import {Observable} from "rxjs";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from "../../environments/environment";

import {ChangeLogin, Login} from "./login/login.component";
import {NotificationService} from "../notification/notification.service";
import {JwtHelperService} from '@auth0/angular-jwt'
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    private url = environment.baseUrl + 'ludimus/';  // URL to web API
    private redirectUrl: string;

    constructor(private http: HttpClient,
                private router: Router,
                private notificationService: NotificationService,
                private jwtHelperService: JwtHelperService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }

    resolve(res: Response) {
        return res || {};
    }

    reject(error: Response | any) {
        if (error.constructor.name === 'TimeoutError') {
            return Observable.throw({code:"TIMEOUT", message: "Response could not be retrieved within the timeout"});
        }
        return Observable.throw(error || {message: "Unknown Error!"});
    }

    login(login: Login): Observable<Object> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post(this.url + 'login', login, httpOptions)
            .map(this.resolve)
            .catch(this.reject);
    }

    changelogin(login: ChangeLogin): Observable<Object> {
        this.redirectUrl = 'tax';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post(this.url + 'secure/changeLogin', login, httpOptions)
            .map(this.resolve)
            .catch(this.reject);
    }

    logout() {
        localStorage.removeItem('id_token');
    };

    isLoggedIn() {
        const token: string = this.jwtHelperService.tokenGetter();
        if (token && !this.jwtHelperService.isTokenExpired(token)) {
            return true;
        }

        this.notificationService.info('Your login period has been expired, you have to login!');
        this.logout();
    }

    redirect() {
        this.router.navigate([this.redirectUrl]);
    }

    checkLogin(url: string): boolean {
        if (this.isLoggedIn()) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['login']);
        return false;
    }
}
