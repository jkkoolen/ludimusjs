import {Component} from '@angular/core';
import {Login} from "./login.component";
import {AuthGuard} from "../auth-guard.service";
import {LoaderService} from "../../loader/loader.service";
import {NotificationService} from "../../notification/notification.service";

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {
    model = new Login();
    constructor(private auth: AuthGuard,
                private  notificationService: NotificationService,
                private loaderService:LoaderService) {

    }

    onSubmit(event:Event) {
        event.preventDefault();
        this.loaderService.setVisible(true);
        this.auth.login(this.model).
            subscribe(
                object  => {
                    this.loaderService.setVisible(false);
                    localStorage.setItem('id_token', object['token']);
                    this.auth.redirect();
                },
                error =>  {
                    this.loaderService.setVisible(false);
                    this.notificationService.warning(error.code);
                });
        return true;
    }
}