import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralLoginComponent implements OnInit {

  referralId: string;
  constructor(protected route: ActivatedRoute) { 
    this.referralId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
