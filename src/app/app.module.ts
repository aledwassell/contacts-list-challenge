import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddressListComponent} from './components/address_list/address-list.component';
import {AddressFormComponent} from './components/address-form/address-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    AddressFormComponent
  ],
  imports: [
    // Angular material modules.
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    // Angular modules.
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
