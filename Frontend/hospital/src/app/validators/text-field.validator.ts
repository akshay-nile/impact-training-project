import { AbstractControl, ValidatorFn } from "@angular/forms";

export function noSpaceValidator(control: AbstractControl): any {
    let isEmpty = ((control.value || '') as string).trim().length == 0;
    return isEmpty ? { isEmpty: { value: true } } : null;
}
