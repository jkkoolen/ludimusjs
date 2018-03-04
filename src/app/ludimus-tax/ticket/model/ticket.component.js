"use strict";
var Ticket = (function () {
    function Ticket() {
        this.ticketDate = new Date();
        this.income = true;
        this.vatRate = 21;
        this.forMonth = this.ticketDate.getMonth() > 0 ? this.ticketDate.getMonth() - 1 : 12;
    }
    return Ticket;
}());
exports.Ticket = Ticket;
