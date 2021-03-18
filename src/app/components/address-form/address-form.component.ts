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

  get firstName(): string {
    return this.form['firstName'].value;
  }
  get lastName(): string {
    return this.form['lastName'].value;
  }
  get phoneNumber(): string|null {
    return this.form['phoneNumber'].value ?? null;
  }

  submit(){
    console.log(this.firstName)
    console.log(this.lastName);
    console.log(this.phoneNumber);
    this.core.addContact(new Contact(this.firstName, this.lastName, this.phoneNumber));
  }

}
