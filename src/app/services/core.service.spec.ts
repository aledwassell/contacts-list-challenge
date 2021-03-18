import { TestBed } from '@angular/core/testing';

import {Contact, CoreService, SortType} from './core.service';

describe('CoreService', () => {
  let service: CoreService;
  const c1 = new Contact('Aled', 'Zulu');
  const c2 = new Contact('Harry', 'Zulu');
  const c3 = new Contact('Zoe', 'Allen');

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreService);
    service.contacts = new Set([c1, c2, c3]);
  });

  it('sorts the contacts', () => {
    service.sortContacts(SortType.LAST_NAME);
    expect(Array.from(service.contacts)[0]).toEqual(c3);

    service.sortContacts(SortType.LAST_NAME);
    expect(Array.from(service.contacts)[2]).toEqual(c2);

    service.sortContacts(SortType.FIRST_NAME);
    expect(Array.from(service.contacts)[0]).toEqual(c1);
  });

  it('adds a contact', () => {
    service.addContact(new Contact('Dorris', 'Smith'));

    expect(service.contacts.size).toBe(4);
  });

  it('removes a contact', () => {
    service.removeContact(c1);

    expect(service.contacts.size).toBe(2);
  });

  it('gets contact by first or last name including partial matches', () => {
    expect(service.getContact('all')).toEqual(c3);
    expect(service.getContact('HaR')).toEqual(c2);
    expect(service.getContact('alled')).toEqual(null);
  });
});
