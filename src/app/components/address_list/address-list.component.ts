import { Component } from '@angular/core';
import { Contact, CoreService } from './../../services/core.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {
  contacts!: Set<Contact>;

  constructor(private core: CoreService) {
    this.contacts = core.contacts;
  }
}
