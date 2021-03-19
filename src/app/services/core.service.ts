import { Injectable } from '@angular/core';

/** Sort type enum. */
export enum SortType {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

 /** Address interface, phone number is otional. */
export class Contact {
  firstName: string;
  lastName: string;
  phoneNumber?: string;

  constructor(private first_name: string, private last_name: string, private phone_number?: string){
     this.firstName = this.first_name;
     this.lastName = this.last_name;
     this.phoneNumber = this.phone_number;
    }
}

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  contacts: Set<Contact> = new Set<Contact>([new Contact('Aled', 'Wassell', '07234563456')]);

  /** Sorts the contacts by SortType, E.g. first or last name. */
  sortContacts(sortType: SortType) {
    this.contacts = new Set(Array.from(this.contacts).sort((a, b) => {
      const nameA = a[sortType].toUpperCase();
      const nameB = b[sortType].toUpperCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }
      return 0; // The names are equal.
    }));
  }

  /** Adds a contact. */
  addContact(contact: Contact) {
    this.contacts.add(contact);
  }

  /** Removes a contact. */
  removeContact(contact: Contact) {
    this.contacts.delete(contact);
  }

  getContact(name: string): Contact|null {
    return Array.from(this.contacts).find(s => stringMatch(s.firstName, name) || stringMatch(s.lastName, name)) ?? null;
  }
}

function stringMatch(targetWord: string, match: string){
  return targetWord.toLocaleLowerCase().match(new RegExp(match.toLocaleLowerCase()));
}
