export class Patient {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    contactNumber: number;
    password: string;
    confirmPassword: string;

    constructor(){
        this.title = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.dateOfBirth = new Date();
        this.contactNumber = 0;
        this.password = '';
        this.confirmPassword = '';
    }
}
