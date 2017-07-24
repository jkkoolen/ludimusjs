import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./ludimus-tax/home/home.component";
import {LoginFormComponent} from "./auth/login/login-form.component";
import {ChangeLoginFormComponent} from "./auth/login/changelogin-form.component";
import {AuthGuard} from "./auth/auth-guard.service";

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginFormComponent},
    {
        path: 'changeLogin',
        canActivate: [AuthGuard],
        component: ChangeLoginFormComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
