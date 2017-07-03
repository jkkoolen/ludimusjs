"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ticket_service_1 = require("../service/ticket.service");
var ticket_component_1 = require("../ticket.component");
var TicketFormComponent = (function () {
    function TicketFormComponent(ticketService) {
        this.ticketService = ticketService;
        this.model = new ticket_component_1.Ticket();
    }
    Object.defineProperty(TicketFormComponent.prototype, "ticketDate", {
        get: function () {
            return this.model.ticketDate.toISOString().substring(0, 10);
        },
        set: function (e) {
            var splitted = e.split('-');
            this.model.ticketDate = new Date(Date.UTC(Number(splitted[0]), Number(splitted[1]) - 1, Number(splitted[2])));
        },
        enumerable: true,
        configurable: true
    });
    TicketFormComponent.prototype.onFileChange = function (fileInput) {
        var files = fileInput.target.files;
        if (files && files.length === 1) {
            this.model.ticketFilename = fileInput.target.files[0].name;
            var myModel_1 = this.model;
            var reader = new FileReader();
            reader.onload = function () {
                delete myModel_1.ticketImage;
                var object = new Uint8Array(this.result);
                myModel_1.ticketImage = Object.keys(object).map(function (key) { return object[key]; });
            };
            reader.readAsArrayBuffer(fileInput.target.files[0]);
        }
    };
    TicketFormComponent.prototype.onSubmit = function (event) {
        event.preventDefault();
        this.ticketService.addTicket(this.model).
            subscribe(function (ticket) { console.log(ticket); }, function (error) { console.log(error); });
        return true;
    };
    TicketFormComponent = __decorate([
        core_1.Component({
            selector: 'ticket-form',
            templateUrl: 'ticket-form.component.html',
            styleUrls: ['ticket-form.component.css'],
            providers: [ticket_service_1.TicketService]
        })
    ], TicketFormComponent);
    return TicketFormComponent;
}());
exports.TicketFormComponent = TicketFormComponent;
