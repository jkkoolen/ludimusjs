import {Component} from '@angular/core';
import {Login} from "./login.component";
import {AuthGuard} from "../auth-guard.service";

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {
    model = new Login();
    constructor(private auth: AuthGuard) {

    }

    onSubmit(event:Event) {
        event.preventDefault();
        this.auth.login(this.model).
            subscribe(
                object  => {
                    localStorage.setItem('id_token', object['token']);
                    this.auth.redirect();
                },
                error =>  {console.log(error)});
        return true;
    }
}