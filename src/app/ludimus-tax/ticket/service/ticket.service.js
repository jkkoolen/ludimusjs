"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var TicketService = (function () {
    function TicketService(authHttp) {
        this.authHttp = authHttp;
        this.url = 'http://localhost:8080/ludimus/'; // URL to web API
    }
    TicketService.prototype.resolve = function (res) {
        return res.json() || {};
    };
    TicketService.prototype.reject = function (error) {
        return error.json() || {};
    };
    TicketService.prototype.getTickets = function () {
        return this.authHttp.get(this.url + 'tickets')
            .map(this.resolve)
            .catch(this.reject);
    };
    ;
    TicketService.prototype.addTicket = function (ticket) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log('post ticket , ', ticket);
        return this.authHttp.post(this.url + 'addTicket', ticket, options)
            .map(this.resolve)
            .catch(this.reject);
    };
    TicketService = __decorate([
        core_1.Injectable()
    ], TicketService);
    return TicketService;
}());
exports.TicketService = TicketService;
