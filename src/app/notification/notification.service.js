"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var NotificationService = (function () {
    function NotificationService() {
        this.notifications = {};
    }
    NotificationService.prototype.success = function (message) {
        this.notifications['success'] = message;
        this.removeAfterTimeout('success');
    };
    NotificationService.prototype.info = function (message) {
        this.notifications['info'] = message;
        this.removeAfterTimeout('info');
    };
    NotificationService.prototype.danger = function (message) {
        this.notifications['danger'] = message;
        this.removeAfterTimeout('danger');
    };
    NotificationService.prototype.warning = function (message) {
        this.notifications['warning'] = message;
        this.removeAfterTimeout('warning');
    };
    NotificationService.prototype.isSuccess = function () {
        return this.notifications['success'];
    };
    NotificationService.prototype.isInfo = function () {
        return this.notifications['info'];
    };
    NotificationService.prototype.isDanger = function () {
        return this.notifications['danger'];
    };
    NotificationService.prototype.isWarning = function () {
        return this.notifications['warning'];
    };
    NotificationService.prototype.getSuccessText = function () {
        return this.notifications['success'];
    };
    NotificationService.prototype.getInfoText = function () {
        return this.notifications['info'];
    };
    NotificationService.prototype.getDangerText = function () {
        return this.notifications['danger'];
    };
    NotificationService.prototype.getWarningText = function () {
        return this.notifications['warning'];
    };
    NotificationService.prototype.removeAfterTimeout = function (label) {
        var notifications = this.notifications;
        setTimeout(function () {
            notifications[label] = undefined;
        }, 6000);
    };
    NotificationService = __decorate([
        core_1.Injectable()
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
