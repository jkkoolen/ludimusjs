import {Inject, Injectable, InjectionToken} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/timeout';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).timeout(8000);
    }
}