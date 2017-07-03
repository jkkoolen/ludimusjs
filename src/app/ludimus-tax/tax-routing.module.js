"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var ticket_overview_component_1 = require("./ticket/overview/ticket-overview.component");
var ticket_form_component_1 = require("./ticket/form/ticket-form.component");
var tax_component_1 = require("./tax.component");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var auth_guard_service_1 = require("../auth/auth-guard.service");
var taxRoutes = [
    {
        path: 'tax',
        component: tax_component_1.TaxComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'overview',
                component: ticket_overview_component_1.TicketOverviewComponent,
                canActivate: [auth_guard_service_1.AuthGuard]
            },
            {
                path: 'addTicket',
                component: ticket_form_component_1.TicketFormComponent,
                canActivate: [auth_guard_service_1.AuthGuard]
            }
        ]
    }
];
var TaxRoutingModule = (function () {
    function TaxRoutingModule() {
    }
    TaxRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forChild(taxRoutes)
            ],
            declarations: [tax_component_1.TaxComponent, ticket_overview_component_1.TicketOverviewComponent, ticket_form_component_1.TicketFormComponent],
            exports: [
                router_1.RouterModule
            ]
        })
    ], TaxRoutingModule);
    return TaxRoutingModule;
}());
exports.TaxRoutingModule = TaxRoutingModule;
