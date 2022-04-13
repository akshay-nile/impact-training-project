import { AbstractControl, ValidatorFn } from "@angular/forms";

export function indexValidator(control: AbstractControl): any {
    let isNegative = (control.value || -1) == -1;
    return isNegative ? { isNegative: { value: true } } : null;
}
