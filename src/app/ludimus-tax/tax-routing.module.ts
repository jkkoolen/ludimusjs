import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TicketOverviewComponent} from "./ticket/overview/ticket-overview.component";
import {TicketFormComponent} from "./ticket/form/ticket-form.component";
import {TaxComponent} from "./tax.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AuthGuard} from "../auth/auth-guard.service";
import {DefaultOverviewComponent} from "./ticket/overview/default/default-overview.component";
import {TaxOverviewComponent} from "./ticket/overview/tax/tax-overview.component";
import {IncomeTaxOverviewComponent} from "./ticket/overview/income-tax/income-tax-overview.component";

const taxRoutes: Routes = [
  {
    path: 'tax',
    component: TaxComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'overview',
        component: TicketOverviewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'addTicket',
        component: TicketFormComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forChild(taxRoutes)
  ],
  declarations: [TaxComponent, TicketOverviewComponent, TicketFormComponent, DefaultOverviewComponent, TaxOverviewComponent, IncomeTaxOverviewComponent],
  exports: [
    RouterModule
  ]
})
export class TaxRoutingModule { }
