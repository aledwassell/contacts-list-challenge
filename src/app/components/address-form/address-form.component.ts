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
    'phoneNumber': new FormControl('', Validators.pattern(/[0-9]/g)),
  });

  constructor(private core: CoreService) {}

  get firstName(): AbstractControl {
    return this.form.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.form.get('lastName');
  }
  get phoneNumber(): AbstractControl {
    return this.form.get('phoneNumber');
  }

  submit(){
    this.core.addContact(new Contact(this.firstName.value, this.lastName.value, this.phoneNumber.value));
    this.form.reset();
  }
}
