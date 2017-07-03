import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {TaxRoutingModule} from './ludimus-tax/tax-routing.module';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './ludimus-tax/home/home.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LoginFormComponent} from './auth/login/login-form.component';
import {NotificationComponent} from './notification/notification.component';
import {NotificationService} from './notification/notification.service';
import {AuthConfig, AuthHttp} from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenName: 'id_token',
        tokenGetter: (() => localStorage.getItem('id_token')),
        noJwtError: true
    }), http, options);
}


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        HttpModule,
        TaxRoutingModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, LoginFormComponent, HomeComponent, NotificationComponent],
    providers: [AuthGuard,
        NotificationService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [ Http, RequestOptions ]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
