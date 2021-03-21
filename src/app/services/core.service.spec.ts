import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import {Contact, CoreService} from './core.service';

describe('CoreService', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let service: CoreService;
  const c1 = new Contact('Aled', 'Zulu', '07555', '1');
  const c2 = new Contact('Harry', 'Zulu', '07555', '2');
  const c3 = new Contact('Zoe', 'Allen', '07555', '3');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CoreService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('lists contacts', () => {
    const expectedContacts: Contact[] = [c1,c2,c3];
    const req = httpMock.expectOne('/contacts');
    expect(req.request.method).toBe("GET");
    req.flush(expectedContacts);

    service.contacts$.subscribe(contacts => {
      expect(contacts.length).toEqual(3);
      expect(contacts).toEqual(expectedContacts);
    });

  });

  it('adds a contact', () => {
    const c4 = new Contact('Dorris', 'Smith');
    const expectedContacts: Contact[] = [c1,c2,c3,c4];
    service.addContact(c4);
    const req = httpMock.expectOne('/contact');
    expect(req.request.method).toBe("POST");
    req.flush(expectedContacts);

    service.contacts$.subscribe(contacts => {
      expect(contacts.length).toEqual(4);
      expect(contacts).toEqual(expectedContacts);
    });
  });

  it('removes a contact', () => {
    const expectedContacts: Contact[] = [c1,c2];
    service.removeContact(c3);
    const req = httpMock.expectOne('/remove-contact/3');
    expect(req.request.method).toBe("DELETE");
    req.flush(expectedContacts);

    service.contacts$.subscribe(contacts => {
      expect(contacts.length).toEqual(2);
      expect(contacts).toEqual(expectedContacts);
    });
  });
});
