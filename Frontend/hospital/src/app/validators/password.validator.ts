import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordValidator(control: AbstractControl): any {
    let chars = ((control.value || '') as string).split('');
    let isValid = chars.length >= 8 && chars.length <= 20 &&
        chars.filter(c => c.match('[a-z]')).length >= 1 &&
        chars.filter(c => c.match('[A-Z]')).length >= 1 &&
        chars.filter(c => c.match('[0-9]')).length >= 1;
    return !control.errors?.required && !isValid ? { isValid: { value: control.value } } : null;
}

export function confirmPassword(field1: string, field2: string): ValidatorFn {
    return function (control: AbstractControl): any {
        const password = control.get(field1);
        const confirm = control.get(field2);
        let areEqual = password.value === confirm.value;
        return !areEqual ? { areEqual: { value: control.value } } : null;
    };
}