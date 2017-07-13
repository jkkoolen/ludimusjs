import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
  visible: boolean;

  constructor() {
    this.visible = false;
  }

  isVisible() : boolean {
    return this.visible;
  }

  setVisible(value: boolean) : void {
    this.visible = value;
  }

}
