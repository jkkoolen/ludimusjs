"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var login_component_1 = require("./login.component");
var LoginFormComponent = (function () {
    function LoginFormComponent(auth) {
        this.auth = auth;
        this.model = new login_component_1.Login();
    }
    LoginFormComponent.prototype.onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        this.auth.login(this.model).
            subscribe(function (object) {
            localStorage.setItem('id_token', object['token']);
            _this.auth.redirect();
        }, function (error) { console.log(error); });
        return true;
    };
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            templateUrl: 'login-form.component.html'
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
