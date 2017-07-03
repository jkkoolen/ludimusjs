"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var angular2_jwt_1 = require('angular2-jwt');
var http_1 = require("@angular/http");
var AuthGuard = (function () {
    function AuthGuard(http, router, notificationService) {
        this.http = http;
        this.router = router;
        this.notificationService = notificationService;
        this.url = 'http://localhost:8080/'; // URL to web API
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.canActivateChild = function (childRoute, state) {
        return this.canActivate(childRoute, state);
    };
    AuthGuard.prototype.resolve = function (res) {
        return res.json() || {};
    };
    AuthGuard.prototype.reject = function (error) {
        return error.json() || {};
    };
    AuthGuard.prototype.login = function (login) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + 'login', login, options)
            .map(this.resolve)
            .catch(this.reject);
    };
    AuthGuard.prototype.logout = function () {
        localStorage.removeItem('id_token');
    };
    ;
    AuthGuard.prototype.isLoggedIn = function () {
        var notExpired = angular2_jwt_1.tokenNotExpired();
        if (notExpired) {
            return true;
        }
        this.notificationService.info('Your login period has been expired, you have to login!');
        this.logout();
    };
    AuthGuard.prototype.redirect = function () {
        this.router.navigate([this.redirectUrl]);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this.isLoggedIn()) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['login']);
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable()
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
