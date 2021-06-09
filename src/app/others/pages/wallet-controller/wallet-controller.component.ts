import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-wallet-controller',
  templateUrl: './wallet-controller.component.html',
  styleUrls: ['./wallet-controller.component.scss'],
})
export class WalletControllerComponent implements OnInit {

  controlType: string;
  routeObserver: Subscription;
  accountValue: number;
  constructor(private route: ActivatedRoute, private identityService: AuthService) { }

  ngOnInit() {
    this.getControlType();
    this.getAccountValue();
  }

  getControlType(){
    this.routeObserver = this.route
      .queryParams
      .subscribe(params => { 
        this.controlType = params['controlType'].toString();
        if (params['controlType'].length <= 0) { this.controlType = 'deposit'; }
      });
  }

  getAccountValue() {
    const data = this.identityService.getBalance();
    this.accountValue = data.game_wallet_ioi * data.ioi_usdt;
  }

}
