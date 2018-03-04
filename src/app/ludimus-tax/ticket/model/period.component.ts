export class Period {
    values = ['quarter1',
        'quarter2',
        'quarter3',
        'quarter4',
        'untilNow'];
    range = {from: new Date(), to: new Date()};
    selectedIndex: number;

    constructor() {
        this.selectedIndex = 4;
        this.setFromTo();
    }

    set from(value: Date) {
        this.range.from = value;
    }

    set to(value: Date) {
        this.range.to = value;
    }

    set choice(value: string) {
        this.selectedIndex = this.values.indexOf(value);
        this.setFromTo();
    }

    get choice(): string {
        return this.values[this.selectedIndex];
    }

    private setFromTo(): void {
        let date = new Date();
        switch (this.selectedIndex) {
            case 0: {
                this.from = new Date(date.getFullYear(), 0, 1);
                this.to = new Date(date.getFullYear(), 3, 0);
                break;
            }
            case 1: {
                this.from = new Date(date.getFullYear(), 3, 1);
                this.to = new Date(date.getFullYear(), 6, 0);
                break;
            }
            case 2: {
                this.from = new Date(date.getFullYear(), 6, 1);
                this.to = new Date(date.getFullYear(), 9, 0);
                break;
            }
            case 3: {
                this.from = new Date(date.getFullYear(), 9, 1);
                this.to = new Date(date.getFullYear(), 12, 0);
                break;
            }
            default: {
                this.from = new Date(date.getFullYear(), 0, 1);
                this.to = date;
                break;
            }
        }
    }
}
