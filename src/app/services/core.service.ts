import { Injectable } from '@angular/core';

/** Sort type enum. */
export enum SortType {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

 /** Address interface, phone number is otional. */
export class Contact {
  constructor(
    private first_name: string,
    private last_name: string,
    private phone_number?: string,
    ){}

    get firstName(){
      return this.first_name;
    }
    set firstName(fn: string){
      this.first_name = fn;
    }
    get lastName(){
      return this.last_name;
    }
    set lastName(fn: string){
      this.last_name = fn;
    }
    get phoneNumber(){
      return this.phone_number;
    }
    set phoneNumber(fn: string){
      this.phone_number = fn;
    }

}

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  contacts: Set<Contact> = new Set<Contact>();

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
