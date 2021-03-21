import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { Contact, CoreService } from '../../services/core.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

/** Sort type enum. */
export enum SortType {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
}

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {
  contacts!: Contact[];
  filterControl = new FormControl('');
  sortTypeEnum = SortType;
  private destroy$ = new Subject();

  constructor(readonly core: CoreService) {
    core.contacts$
    .pipe(takeUntil(this.destroy$), map(contacts => this.filterContacts(contacts)))
    .subscribe(contacts => this.contacts = contacts);

    this.filterControl.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(() => {
      this.core.contacts$.next(this.core.contacts$.value);
    });
  }

  ngOnDestroy() {
    // Trigger unsubscribe from all subscriptions when component is destroyed.
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Sorts the contacts by SortType, E.g. first or last name. */
  sortContacts(sortType: SortType) {
    sortContactsByName(this.contacts, sortType);
  }

  /** Filter provided list of contacts by filter control value. */
  private filterContacts(contacts: Contact[]): Contact[] {
    if(this.filterControl.value) {
      const regexp = new RegExp(this.filterControl.value, 'i');
      return contacts.filter(contact => regexp.test(contact.first_name) || regexp.test(contact.last_name));
    }
    return contacts;
  }
}

/** Sort provided list of contacts sort type e.g. first_name or last_name. */
function sortContactsByName(contacts: Contact[], sortType: SortType) {
  contacts.sort((a, b) => {
    const nameA = a[sortType].toUpperCase();
    const nameB = b[sortType].toUpperCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0; // The names are equal.
  });
}
