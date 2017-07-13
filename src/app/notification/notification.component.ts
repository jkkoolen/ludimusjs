import { Component } from '@angular/core';
import {NotificationService} from "./notification.service";

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['notification.component.css']

})
export class NotificationComponent {

  constructor(private notificationService:NotificationService) { }

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
