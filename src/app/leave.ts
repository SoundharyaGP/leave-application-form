export class leave {
    name: string;
    email: string;
    dellemail: string;
    deloitteemail: string;
    startDate: string;
    endDate: string;
    reason: string;
    leave: string;

    constructor(name: string,
        email: string,
        dellemail: string,
        deloitteemail: string,
        startDate: string,
        endDate: string,
        reason: string,
        leave: string,) {

            this.name = name;
            this.email = email;
            this.dellemail = dellemail;
            this.deloitteemail = deloitteemail;
            this.startDate = startDate;
            this.endDate = endDate;
            this.reason = reason;
            this.leave = leave;
    }
}