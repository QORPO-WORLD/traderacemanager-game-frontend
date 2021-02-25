import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-verified',
  templateUrl: './user-verified.component.html',
  styleUrls: ['./user-verified.component.scss']
})
export class UserVerifiedComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    const that = this;
    setTimeout(() => {
      that.route.navigate(['/race/start-race']);
    }, 5000);
  }

}
