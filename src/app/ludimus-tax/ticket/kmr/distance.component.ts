export class Value {
    text: string;
    value: number;
}

export class Row {
    elements: Elements[]
}

export class Elements {
    distance: Value;
    duration: Value;
    status:string;
}
export class Distance {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: Row[];
    status:string;
}

export class Kmr {
    day: Date;
    origin: string;
    destination: string;
    isBusiness : boolean;
    startTotal: number;
    endTotal: number;

    constructor() {
        this.day = new Date();
        this.isBusiness = true;
    }
}