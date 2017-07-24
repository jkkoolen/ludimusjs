import {Component} from '@angular/core';
import {ChangeLogin} from "./login.component";
import {AuthGuard} from "../auth-guard.service";
import {LoaderService} from "../../loader/loader.service";
import {NotificationService} from "../../notification/notification.service";

@Component({
    selector: 'changelogin-form',
    templateUrl: 'changelogin-form.component.html'
})
export class ChangeLoginFormComponent {
    model = new ChangeLogin();
    constructor(private auth: AuthGuard,
                private  notificationService: NotificationService,
                private loaderService:LoaderService) {

    }

    onSubmit(event:Event) {
        event.preventDefault();
        this.loaderService.setVisible(true);
        this.auth.changelogin(this.model).
            subscribe(
                object  => {
                    this.loaderService.setVisible(false);
                    localStorage.setItem('id_token', object['token']);
                    this.model = new ChangeLogin();
                    this.notificationService.success("Password is changed successfully");
                    this.auth.redirect();
                },
                error =>  {
                    this.loaderService.setVisible(false);
                    this.notificationService.warning(JSON.stringify(error));
                });
        return true;
    }
}