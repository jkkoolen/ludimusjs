import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TaxRoutingModule} from './ludimus-tax/tax-routing.module';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './ludimus-tax/home/home.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LoginFormComponent} from './auth/login/login-form.component';
import {NotificationComponent} from './notification/notification.component';
import {NotificationService} from './notification/notification.service';
import {SharedModule} from "./shared.module";
import {ChangeLoginFormComponent} from "./auth/login/changelogin-form.component";
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt'
import {HttpClientModule} from "@angular/common/http";

export function getToken (){
    return localStorage.getItem('id_token');
}
const jwtConf: JwtModuleOptions = {
    config: {
        tokenGetter: getToken,
        whitelistedDomains: ['ludimus.eu','localhost:8080']
    }
};

@NgModule({
    imports: [
        HttpClientModule,
        JwtModule.forRoot(jwtConf),
        TaxRoutingModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [AppComponent, LoginFormComponent, ChangeLoginFormComponent, HomeComponent, NotificationComponent],
    providers: [
        AuthGuard,
        NotificationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
