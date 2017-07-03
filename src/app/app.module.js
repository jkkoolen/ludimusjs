"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var tax_routing_module_1 = require("./ludimus-tax/tax-routing.module");
var app_routing_module_1 = require("./app-routing.module");
var common_1 = require("@angular/common");
var home_component_1 = require("./ludimus-tax/home/home.component");
var auth_guard_service_1 = require("./auth/auth-guard.service");
var login_form_component_1 = require("./auth/login/login-form.component");
var notification_component_1 = require("./notification/notification.component");
var notification_service_1 = require("./notification/notification.service");
var angular2_jwt_1 = require('angular2-jwt');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                tax_routing_module_1.TaxRoutingModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [app_component_1.AppComponent, login_form_component_1.LoginFormComponent, home_component_1.HomeComponent, notification_component_1.NotificationComponent],
            providers: [auth_guard_service_1.AuthGuard,
                notification_service_1.NotificationService,
                angular2_jwt_1.AUTH_PROVIDERS
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
