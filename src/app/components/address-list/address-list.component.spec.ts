import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Contact, CoreService} from './../../services/core.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AddressListComponent, SortType } from './address-list.component';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AddressListComponent', () => {
  let component: AddressListComponent;
  let fixture: ComponentFixture<AddressListComponent>;
  let coreServiceStub: Partial<CoreService>;

  const c1 = new Contact('Aled', 'Zulu');
  const c2 = new Contact('Harry', 'Zulu');
  const c3 = new Contact('Zoe', 'Allen');

  beforeEach(async () => {
    coreServiceStub = {
      contacts$: new BehaviorSubject([c1,c2,c3]),
    };
    await TestBed.configureTestingModule({
      declarations: [ AddressListComponent ],
      providers: [ { provide: CoreService, useValue: coreServiceStub } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sorts the contacts', () => {
    component.sortContacts(SortType.LAST_NAME);
    expect(component.contacts[0]).toEqual(c3);

    component.sortContacts(SortType.LAST_NAME);
    expect(component.contacts[2]).toEqual(c2);

    component.sortContacts(SortType.FIRST_NAME);
    expect(component.contacts[0]).toEqual(c1);
  });

  it('filters contacts by first or last name including partial matches', fakeAsync(() => {
    const contacts = [c1,c2,c3]

    component.filterControl.setValue('all');
    tick(400);
    expect(component['filterContacts'](contacts)).toEqual([c3]);

    component.filterControl.setValue('HaR');
    tick(400);
    expect(component['filterContacts'](contacts)).toEqual([c2]);

    component.filterControl.setValue('alled');
    tick(400);
    expect(component['filterContacts'](contacts)).toEqual([]);
  }));
});
