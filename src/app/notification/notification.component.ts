import { Component, OnInit } from '@angular/core';
import {NotificationService} from "./notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService:NotificationService) { }

  ngOnInit() {
  }

  isSuccess() {
    return this.notificationService.isSuccess();
  }

  isInfo() {
    return this.notificationService.isInfo();
  }

  isDanger() {
    return this.notificationService.isDanger();
  }

  isWarning() {
    return this.notificationService.isWarning();
  }

  getSuccessText() {
    return this.notificationService.getSuccessText();
  }

  getInfoText() {
    return this.notificationService.getInfoText();
  }

  getDangerText() {
    return this.notificationService.getDangerText();
  }

  getWarningText() {
    return this.notificationService.getWarningText();
  }
}
