"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var NotificationComponent = (function () {
    function NotificationComponent(notificationService) {
        this.notificationService = notificationService;
    }
    NotificationComponent.prototype.ngOnInit = function () {
    };
    NotificationComponent.prototype.isSuccess = function () {
        return this.notificationService.isSuccess();
    };
    NotificationComponent.prototype.isInfo = function () {
        return this.notificationService.isInfo();
    };
    NotificationComponent.prototype.isDanger = function () {
        return this.notificationService.isDanger();
    };
    NotificationComponent.prototype.isWarning = function () {
        return this.notificationService.isWarning();
    };
    NotificationComponent.prototype.getSuccessText = function () {
        return this.notificationService.getSuccessText();
    };
    NotificationComponent.prototype.getInfoText = function () {
        return this.notificationService.getInfoText();
    };
    NotificationComponent.prototype.getDangerText = function () {
        return this.notificationService.getDangerText();
    };
    NotificationComponent.prototype.getWarningText = function () {
        return this.notificationService.getWarningText();
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'app-notification',
            templateUrl: './notification.component.html'
        })
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
