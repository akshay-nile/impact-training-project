import { AbstractControl, ValidatorFn } from "@angular/forms";

export function indexValidator(control: AbstractControl): any {
    let value = typeof (control.value) == 'object' ? control.value['value'] : control.value;
    let isNegative = (value as number) == -1;
    return isNegative ? { isNegative: { value: true } } : null;
}
