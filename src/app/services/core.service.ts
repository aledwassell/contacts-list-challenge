import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

 /** Address interface, phone number is otional. */
export class Contact {
  constructor(
    readonly first_name: string,
    readonly last_name: string,
    readonly phone_number?: string,
    readonly _id?: string){}
}

@Injectable({
  providedIn: 'root'
})
export class CoreService implements OnDestroy {
  contacts$ = new BehaviorSubject<Contact[]>([]);
  private destroy$ = new Subject();

  constructor(private http: HttpClient){
    http.get<Contact[]>('/contacts', httpOptions)
    .pipe(takeUntil(this.destroy$))
    .subscribe(resp => {
      this.contacts$.next(resp);
    });
  }

  ngOnDestroy() {
    // Trigger unsubscribe from all subscriptions when service is destroyed.
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Adds a contact. */
  addContact(contact: Contact) {
    this.http.post<Contact[]>('/contact', JSON.stringify(contact), httpOptions)
    .pipe(takeUntil(this.destroy$))
    .subscribe(resp => {
      this.contacts$.next(resp)
    })
  }

  /** Removes a contact. */
  removeContact(contact: Contact) {
    this.http.delete<Contact[]>(`/remove-contact/${contact._id}`, httpOptions)
    .pipe(takeUntil(this.destroy$))
    .subscribe(resp => {
      this.contacts$.next(resp)
    })
  }
}

