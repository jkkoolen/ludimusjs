"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ticket_service_1 = require("../service/ticket.service");
var TicketOverviewComponent = (function () {
    function TicketOverviewComponent(ticketService) {
        this.ticketService = ticketService;
    }
    TicketOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ticketService.getTickets().subscribe(function (tickets) { return _this.tickets = tickets; }, function (error) { console.log(error); });
    };
    TicketOverviewComponent.prototype.onSelect = function (ticket) {
        this.selectedTicket = ticket;
        console.log('selected ', this.selectedTicket);
    };
    TicketOverviewComponent.prototype.getImageBase64 = function (data) {
        function Uint8ToString(u8a) {
            var CHUNK_SZ = 0x8000;
            var c = new Array();
            for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
                c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
            }
            return c.join("");
        }
        var u8 = new Uint8Array(data);
        return 'data:image/png;base64,' + btoa(Uint8ToString(u8));
    };
    TicketOverviewComponent = __decorate([
        core_1.Component({
            selector: 'ticket-overview',
            templateUrl: 'ticket-overview.component.html',
            providers: [ticket_service_1.TicketService]
        })
    ], TicketOverviewComponent);
    return TicketOverviewComponent;
}());
exports.TicketOverviewComponent = TicketOverviewComponent;
