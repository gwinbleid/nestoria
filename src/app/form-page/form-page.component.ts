import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './custom-validators/must-match';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  amazingForm = this.fb.group({
    firstName: ['', {
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
      updateOn: 'blur'
    }],
    lastName: ['', {
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
      updateOn: 'blur'
    }],
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    address: this.fb.group({
      street: ['', {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
        updateOn: 'blur'
      }],
      city: ['', {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
        updateOn: 'blur'
      }],
      state: ['', {
        valdiators: [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
        updateOn: 'blur'
      }],
      zip: ['', {
        validators: [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')],
        updateOn: 'blur'
      }]
    }),
    password: ['', {
      validators: [Validators.required, Validators.minLength(6)],
      updateOn: 'blur'
    }],
    confirmPassword: ['', {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    aliases: this.fb.array([
      this.fb.control('', {
        validators: [Validators.minLength(4), Validators.maxLength(12)],
        updateOn: 'blur'
      })
    ])
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get aliases() {
    return this.amazingForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.amazingForm.value);
  }

}
