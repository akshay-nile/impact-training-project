import { AbstractControl } from "@angular/forms";

export function passwordValidator(control: AbstractControl): any {
    let chars = ((control.value || '') as string).split('');
    let isValid = chars.length >= 8 && chars.length <= 20 &&
        chars.filter(c => c.match('[a-z]')).length >= 1 &&
        chars.filter(c => c.match('[A-Z]')).length >= 1 &&
        chars.filter(c => c.match('[0-9]')).length >= 1;
    return !isValid ? { isValid: { value: control.value } } : null;
}