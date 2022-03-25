import { AbstractControl, ValidatorFn } from '@angular/forms'
export class Validation {

    static match(password:string, confirmpassword:string):ValidatorFn {
        return (controls:AbstractControl) => {
            const pass = controls.get(password);
            const cpass = controls.get(confirmpassword);

            if(pass?.value !== cpass?.value) {
                controls.get(confirmpassword)?.setErrors({m:true});
                return {m:true};
            } else {
                return null;
            }
        };
    }
}
