import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-email-created',
  templateUrl: './email-created.component.html',
  styleUrls: ['./email-created.component.scss']
})
export class EmailCreatedComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    const that = this;
    setTimeout(() => {
      that.route.navigate(['/user/sign-in']);
    }, 5000);
  }

}
