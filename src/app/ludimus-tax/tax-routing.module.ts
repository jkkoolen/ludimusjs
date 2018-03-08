import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TicketOverviewComponent} from "./ticket/overview/ticket-overview.component";
import {TicketFormComponent} from "./ticket/form/ticket-form.component";
import {TaxComponent} from "./tax.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {DefaultOverviewComponent} from "./ticket/overview/default/default-overview.component";
import {TaxOverviewComponent} from "./ticket/overview/tax/tax-overview.component";
import {IncomeTaxOverviewComponent} from "./ticket/overview/income-tax/income-tax-overview.component";
import {SharedModule} from "../shared.module";
import {ImageDialogComponent} from "./ticket/overview/image-dialog.component";
import {KmrComponent} from "./ticket/kmr/kmr.component";
import {KmrOverviewComponent} from "./ticket/overview/kmr/kmr-overview.component";
import {ConfirmDialogComponent} from "./ticket/overview/confirm-dialog.component";

const taxRoutes: Routes = [
    {
        path: 'tax',
        component: TaxComponent,
        canActivate: [AuthGuard],
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
            },
            {
                path: 'kmr',
                component: KmrComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(taxRoutes)
    ],
    declarations: [TaxComponent, TicketOverviewComponent, TicketFormComponent, DefaultOverviewComponent,
        TaxOverviewComponent, IncomeTaxOverviewComponent, ImageDialogComponent, KmrComponent, KmrOverviewComponent,
        ConfirmDialogComponent],
    entryComponents: [ImageDialogComponent, ConfirmDialogComponent],
    exports: [
        RouterModule
    ]
})
export class TaxRoutingModule {
}
