import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private notifications = {};
  constructor() { }

  success(message:string) {
    this.notifications['success'] = message;
    this.removeAfterTimeout('success');
  }

  info(message:string) {
    this.notifications['info'] = message;
    this.removeAfterTimeout('info');
  }

  danger(message:string) {
    this.notifications['danger'] = message;
    this.removeAfterTimeout('danger');
  }

  warning(message:string) {
    this.notifications['warning'] = message;
    this.removeAfterTimeout('warning');
  }

  isSuccess():boolean {
    return this.notifications['success'];
  }

  isInfo():boolean {
    return this.notifications['info'];
  }

  isDanger():boolean {
    return this.notifications['danger'];
  }

  isWarning():boolean {
    return this.notifications['warning'];
  }

  getSuccessText():string {
    return this.notifications['success'];
  }

  getInfoText():string {
    return this.notifications['info'];
  }

  getDangerText():string {
    return this.notifications['danger'];
  }

  getWarningText():string {
    return this.notifications['warning'];
  }

  private removeAfterTimeout(label) {
    let notifications = this.notifications;
    setTimeout(function() {
      notifications[label] = undefined;
    }, 6000);
  }
}
