import { AbstractControl, ValidatorFn } from "@angular/forms";

export function noSpaceValidator(control: AbstractControl): any {
    if(!control.value) return null;
    let value = typeof (control?.value) == 'object' ? control.value['value'] : control.value;
    let isEmpty = (value as string).trim().length == 0;
    return isEmpty ? { isEmpty: { value: true } } : null;
}
