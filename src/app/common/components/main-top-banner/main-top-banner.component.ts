import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-main-top-banner',
  templateUrl: './main-top-banner.component.html',
  styleUrls: ['./main-top-banner.component.scss'],
})
export class MainTopBannerComponent implements OnInit {

  constructor(private identityService: AuthService) { }

  myDriverStats: any;
  @Input() page = 'default';
  @Input() sum: number;

  ngOnInit() {
    this.getMydriver();
  }

  getMydriver() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }

}
