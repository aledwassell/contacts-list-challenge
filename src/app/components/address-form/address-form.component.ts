import { Contact, CoreService } from './../../services/core.service';
import { Component } from '@angular/core';
import {FormControl, AbstractControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  form = new FormGroup({
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'phoneNumber': new FormControl(''),
  });

  constructor(private core: CoreService) {}

  get firstName(): AbstractControl {
    return this.form.controls['firstName'];
  }
  get lastName(): AbstractControl {
    return this.form.controls['lastName'];
  }
  get phoneNumber(): AbstractControl {
    return this.form.controls['phoneNumber'];
  }

  submit(){
    this.core.addContact(new Contact(this.firstName.value, this.lastName.value, this.phoneNumber.value));
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

}
