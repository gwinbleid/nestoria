import { FormGroup } from "@angular/forms";

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // Если другой валидатор нашел уже ошибку
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: {comparsion_field: controlName} });
        } else {
            matchingControl.setErrors(null);
        }
    }
}