import {Component, OnInit} from "@angular/core";
import {KmrService} from "../service/kmr.service";
import {Distance, Kmr} from "./distance.component";
import {LoaderService} from "../../../loader/loader.service";
import {NotificationService} from "../../../notification/notification.service";

@Component({
    selector:'kmr',
    templateUrl: 'kmr.component.html',
    providers: [KmrService]

})
export class KmrComponent {
    model = new Kmr();
    constructor(private kmrService: KmrService,
                private loaderService: LoaderService,
                private notificationService: NotificationService){}

    onSubmit(event):void {
        event.preventDefault();
        this.loaderService.setVisible(true);
        this.kmrService.getDistance(this.model.origin, this.model.destination).
         subscribe(response=>{
                this.loaderService.setVisible(false);
                this.model.origin = response.origin_addresses.join(':');
                this.model.destination = response.destination_addresses.join(':');
                if(this.isOk(response)) {
                  this.model.startTotal = this.model.endTotal - (response.rows[0].elements[0].distance.value/1000);
                  console.log('kmr model ', this.model);
                    this.loaderService.setVisible(true);
                    this.kmrService.saveDistance(this.model)
                        .subscribe(
                          kmr  => {
                              this.loaderService.setVisible(false);
                              this.notificationService.success("KM registration stored successfull");
                              this.model = new Kmr();
                          },
                          error =>  {
                              this.loaderService.setVisible(false);
                              this.notificationService.danger(error.code);
                          });
                }
            },
            error=>{
                this.loaderService.setVisible(false);
                this.notificationService.success("Er is iets misgegaan met het vinden van de plaatsen");
            });
    }

    isOk(response:Distance):boolean {
        if(response.rows && response.rows.length > 0) {
            return response.rows[0].elements[0].status === 'OK';
        }
        return false;
    }

}