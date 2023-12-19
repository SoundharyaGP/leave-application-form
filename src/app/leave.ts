export class leave {
    name: string;
    email: string;
    dellemail: string;
    approveremail: string;
    startDate: string;
    endDate: string;
    reason: string;
    leave: string;

    constructor(
        name: string,
        email: string,
        dellemail: string,
        approveremail: string,
        startDate: string,
        endDate: string,
        reason: string,
        leave: string,) {

            this.name = name;
            this.email = email;
            this.dellemail = dellemail;
            this.approveremail = approveremail;
            this.startDate = startDate;
            this.endDate = endDate;
            this.reason = reason;
            this.leave = leave;
    }
}