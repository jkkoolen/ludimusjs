import {BehaviorSubject, Observable} from "rxjs";
import {KmrService} from "../service/kmr.service";
import {Period} from "../period.component";
import {LoaderService} from "../../../loader/loader.service";
import {NotificationService} from "../../../notification/notification.service";
import {DataSource} from "@angular/cdk";
import {Kmr} from "../kmr/distance.component";

export class KmrDatabase {
    dataChange: BehaviorSubject<Kmr[]> = new BehaviorSubject<Kmr[]>([]);
    get data(): Kmr[] { return this.dataChange.value; }

    constructor(private kmrService: KmrService,
                private loaderService: LoaderService,
                private notificationService: NotificationService) {
    }


    /** Adds a new user to the database. */
    requestKmrs(period: Period) {
        this.loaderService.setVisible(true);
        this.kmrService.getKmrOverview(period.range.from, period.range.to).subscribe(
            kmrs => {
                this.dataChange.next(kmrs);
                this.loaderService.setVisible(false);
            },
            error => {
                this.loaderService.setVisible(false);
                this.notificationService.danger(JSON.stringify(error));
            });
    }
}

export class KmrDataSource extends DataSource<Kmr> {
    constructor(private _kmrDatabase: KmrDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Kmr[]> {
        return this._kmrDatabase.dataChange;
    }

    disconnect() {}
}