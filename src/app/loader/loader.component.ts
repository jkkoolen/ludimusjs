import { Component } from '@angular/core';
import {LoaderService} from "./loader.service";

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  constructor(private loaderService:LoaderService) { }

  show() : boolean {
    return this.loaderService.isVisible();
  }

}
