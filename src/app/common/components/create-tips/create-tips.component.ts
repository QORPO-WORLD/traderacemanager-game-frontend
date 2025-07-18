import { Subscription } from 'rxjs';
import { TeamsService } from 'src/app/api/services';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-create-tips',
  templateUrl: './create-tips.component.html',
  styleUrls: ['./create-tips.component.scss'],
})
export class CreateTipsComponent implements OnInit, OnDestroy {

  myBet: Array<any> = [
    { symbol: 'BTCUSDT', desc: 'BTC', selected: false, favourite: false, short: false, customIndex: 0 },
    { symbol: 'ETHUSDT', desc: 'ETH', selected: false, favourite: false, short: false, customIndex: 1 },
    { symbol: 'XRPUSDT', desc: 'XRP', selected: false, favourite: false, short: false, customIndex: 2 },
    { symbol: 'BCHUSDT', desc: 'BCH', selected: false, favourite: false, short: false, customIndex: 3 },
    { symbol: 'LTCUSDT', desc: 'LTC', selected: false, favourite: false, short: false, customIndex: 4 },
    { symbol: 'EOSUSDT', desc: 'EOS', selected: false, favourite: false, short: false, customIndex: 5 },
    { symbol: 'BNBUSDT', desc: 'BNB', selected: false, favourite: false, short: false, customIndex: 6 },
    { symbol: 'XMRUSDT', desc: 'XMR', selected: false, favourite: false, short: false, customIndex: 7 },
    { symbol: 'ADAUSDT', desc: 'ADA', selected: false, favourite: false, short: false, customIndex: 8 },
    { symbol: 'TRXUSDT', desc: 'TRX', selected: false, favourite: false, short: false, customIndex: 9 },
    { symbol: 'BATUSDT', desc: 'BAT', selected: false, favourite: false, short: false, customIndex: 10 },
    { symbol: 'XLMUSDT', desc: 'XLM', selected: false, favourite: false, short: false, customIndex: 11 },
    { symbol: 'XTZUSDT', desc: 'XTZ', selected: false, favourite: false, short: false, customIndex: 12 },
    { symbol: 'ENJUSDT', desc: 'ENJ', selected: false, favourite: false, short: false, customIndex: 13 },
    { symbol: 'MATICUSDT', desc: 'MATIC', selected: false, favourite: false, short: false, customIndex: 14 },
    { symbol: 'LINKUSDT', desc: 'LINK', selected: false, favourite: false, short: false, customIndex: 15 },
    { symbol: 'WAVESUSDT', desc: 'WAVES', selected: false, favourite: false, short: false, customIndex: 16 },
    { symbol: 'ZILUSDT', desc: 'ZIL', selected: false, favourite: false, short: false, customIndex: 17 },
    { symbol: 'VETUSDT', desc: 'VET', selected: false, favourite: false, short: false, customIndex: 18 },
    { symbol: 'USDTUSDT', desc: 'USDT', selected: false, favourite: false, short: false, customIndex: 19 }
  ];
  selectedTips: Array<number> = [];
  teamId: number;
  @Output() editTips = new EventEmitter<boolean>();
  eventSubscription: Subscription;
  constructor(private api: TeamsService, private identityService: AuthService) { }

  ngOnInit() {
    this.getMyLeaderboard();
  }


  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  toggleCoin(customIndex: number) {
    const cIndex = customIndex;

    const isSituated = this.selectedTips.find(i => i === cIndex);
    if (!isSituated && isSituated !== 0) {

      if (this.selectedTips.length < 3) {
        this.selectedTips.push(cIndex);
        this.myBet[cIndex].selected = true;
      }
    } else {

      this.selectedTips = this.selectedTips.filter(j => j !== cIndex);
      this.myBet[cIndex].selected = false;
    }

  }

  saveTips() {
    const arr = [];
    for (let x = 0; x < this.myBet.length; x++) {
      if (this.myBet[x].selected === true) {
        arr.push(
          this.myBet[x]
        )
      }
    }

    this.eventSubscription = this.api.putTips(this.teamId, { tips: arr }).subscribe(data => {
      this.editTips.emit(false);
    });
  }

  getMyLeaderboard() {
    const data = this.identityService.getLeaderboardMe();
    this.teamId = data.team_id;
  }
}
