import { Component, forwardRef, HostBinding, Input, Injector, ElementRef, Renderer2 } from "@angular/core";
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'material-input',
    template: `
        <div class="group" >
            <input 
                id="name" 
                type="text"
                
                (input)="updateValue($event.target.value)"
                (blur)="onTouched()"
                [class.pristine]="control.pristine && !control.touched"
                [class.error]="!control.valid && control.touched"
                [class.dirty]="value"
                [class.valid]="control.valid && control.touched"
            >
            <label 
                [class.validLabel]="control.valid && control.touched"
                [class.errorLabel]="!control.valid && control.touched"
                for="name">{{field}}</label>      
            <ul *ngIf="control.invalid && control.touched">
                <li class="error-message" *ngIf="!control.valid && control.errors.required">{{field}} required!</li>
                <li class="error-message" *ngIf="!control.valid && control.errors.email">Incorrect e-mail format</li>
                <li class="error-message" *ngIf="!control.valid && control.errors.minlength">{{field}} must be at least {{control.errors.minlength.requiredLength}} symbols</li>
                <li class="error-message" *ngIf="!control.valid && control.errors.maxlength">{{field}} must be no more than {{control.errors.maxlength.requiredLength}} symbols</li>
                <li class="error-message" *ngIf="!control.valid && control.errors.pattern">Incorrect format of {{field}}</li>
                <li class="error-message" *ngIf="!control.valid && control.errors.mustMatch">{{control.errors.mustMatch.comparsion_field}} and {{field}} don't match</li>
            </ul>
        </div>
    `,
    styleUrls: ['./custom-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        }
    ]
})
export class CustomInputComponent implements ControlValueAccessor {

    control: NgControl;
    value = '';
    errors;

    constructor(
        private inj: Injector,
        private el: ElementRef,
        private render: Renderer2
    ) { }

    ngOnInit() {
        this.control = this.inj.get(NgControl);
        this.render.setStyle(this.el.nativeElement, 'height', '70px');
    }

    @Input() field;
    @Input() _id;

    @Input() disabled = false;
    @HostBinding('style.opacity')
    get opacity() {
        return this.disabled ? 0.25 : 1;
    }



    onChange = (value: any) => { };

    onTouched = () => {};

    writeValue(value: any) {
        this.value = value;
        console.log(value);
        this.onChange(this.value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    updateValue(e) {
        this.value = e; // html
        console.log(this.control.errors);
        this.onChange(e);
        this.onTouched();
    }
}