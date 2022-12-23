import dayjs from "dayjs";

export default class HelloEntity {
    public modified: Date;

    constructor(public name: string) {
        this.modified = new Date();
    }

    public modifiedFormat(format: string = "YYYY-MM-DD HH:mm:ss"): string {
        return dayjs(this.modified).format(format);
    }
}
