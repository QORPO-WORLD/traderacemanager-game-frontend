import { NotifiqService } from 'src/app/common/services/notifiq.service';
import { Component, OnInit } from '@angular/core';
import ContactsX from 'cordova-plugin-contacts-x';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

declare let window: any;
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  constructor(private notify: NotifiqService, private contacts: Contacts) { }

  ngOnInit() {

    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
    .then(data => {
      console.log(data);
    });
    console.log(window.ContactsX);
    window.ContactsX.hasPermission(function (success) {
      console.log(success);
      this.hasAccess()
    }, function (error) {
      console.log(error);
      this.hasNotAccess()
    });
  }

  hasAccess() {
    window.ContactsX.find(function(success) {
      console.log(success);
    }, function (error) {
      console.error(error);
    }, {
      fields: {
        emails: true
      }
    });
  }

  hasNotAccess() {
    window.ContactsX.requestPermission(function(success) {
      this.hasAccess();
    }, function (error) {
      console.error(error);
      this.notify.success("We can't use phonelist on your device, please enable it in the settings");
    });
  }

}
