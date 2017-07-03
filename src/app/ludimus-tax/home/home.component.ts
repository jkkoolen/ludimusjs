import {Component, OnInit} from "@angular/core";
import {AuthGuard} from "../../auth/auth-guard.service";

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthGuard) {
  }

  ngOnInit() {
    this.auth.logout();
  }

}
