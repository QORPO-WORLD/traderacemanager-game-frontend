import { Coin } from './../../api/models/coin';
import { BalanceService } from './../../common/services/balance.service';
import { UsersTransactionsDelta } from './../../api/models/users-transactions-delta';
import { InvestorMetrics } from './../../api/models/investor-metrics';
import { Order } from './../../api/models/order';
import { NotifiqService } from './../../common/services/notifiq.service';
import { DriversService, MetricsService, NitroWalletService, TickerPricesService } from 'src/app/api/services';
import { Assets } from './../../api/models/assets';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { AuthService as ninja } from '../../user/services/auth.service';
@Component({
  selector: 'app-coin-swtx',
  templateUrl: './coin-swtx.component.html',
  styleUrls: ['./coin-swtx.component.scss'],
})
export class CoinSwtxComponent implements OnInit {
  assetObserver: Subscription;
  assetOwnObserver: Subscription;
  depassObserver: Subscription;
  exassObserver: Subscription;
  withassObserver: Subscription;
  getexObserver: Subscription;
  walletSubscription: Subscription;
  xSubscription: Subscription;
  tickerSubscription: Subscription;
  stakeObserver: Subscription;
  nitroObserver: Subscription;
  actualPage = 1;
  totalPages: number;
  amount = 0;
  myAssets = [];
  exchangeActual: any;
  myOwnAssets: Assets[];
  leftSum = 50;
  rightSum = 50;
  helperBool = false;
  editingWallet = false;
  savingCryptoAddress = false;
  ticker: any;
  selectedExchnage: string;
  selectedDeposit: string;
  selectedWithdrawal: string;
  waletsTypes = [
    { type: 'game_wallet_trx', name: 'Nitro wallet' },
    { type: 'game_wallet_trx', name: 'Game wallet' },
    { type: 'game_wallet_ioi', name: 'Nitro wallet' },
    { type: 'game_wallet_ioi', name: 'Game wallet' }
  ];
  tokenTypes = [
    { type: 'ioi', name: 'ioi' },
    { type: 'trx', name: 'trx' }
  ];
  walletSelected = this.waletsTypes[0].name;
  walletToSelected = this.waletsTypes[1].name;
  tokenSelected = this.tokenTypes[0].type;
  togetherSum: number;
  ioiValue: number;
  trxValue: number;
  depositFrom: string;
  cryptoAddress = '';
  myOrder: Order;
  im: InvestorMetrics[];
  myPaid: any;
  transDelta: UsersTransactionsDelta;
  turnoverData = [];
  lastWeekData = [];
  thisWeekData = [];
  percentDiff: number;
  weekIncrease: number;
  authcode: string;
  authenabled: boolean;
  minAmount: number;
  maxAmount: number;
  csfee: number;
  mybuyMax: number;
  turnDelta: number;
  ioirewardDelta: number;
  trxDiff: number;
  ioiTransDelta: number;
  trxTransDelta: number;
  myDriver: any;
  assets = 0;
  chart: any;
  myDriverIdentity: any;
  myStaking: number;


  constructor(private ntrsrvc: NitroWalletService, private notify: NotifiqService,
    private eapi: MetricsService, private api: DriversService,
    private balanceService: BalanceService, private elementRef: ElementRef,
    private tickerService: TickerPricesService, private identityService: ninja) { }

  ngOnInit() {
    //this.getMatrics();
    this.getMyownAssets();
    this.getTicker();
    this.notifyChangedBalance();
    this.getMydriver();
  }


  getMyAssets() {
    this.assetObserver = this.ntrsrvc.nitroWalletCoinsList(this.actualPage).subscribe(data => {
      const olddata: any = data;
      this.myAssets = olddata.results;
      const mixOwn = this.myOwnAssets;

      for (let i = 0; i < this.myOwnAssets.length; i++) {
        // tslint:disable-next-line: prefer-for-of
        for (let xx = 0; xx < this.myAssets.length; xx++) {

          if (this.myOwnAssets[i].symbol === this.myAssets[xx].symbol) {
            this.myAssets[xx].own = this.myOwnAssets[i];

          }
        }
      }

      this.totalPages = olddata.total_pages;
    });
  }

  getMyownAssets() {
    this.assetOwnObserver = this.ntrsrvc.nitroWalletAssetsList().subscribe(data => {
      const olddata: any = data;
      this.myOwnAssets = olddata.results;

      this.getMyAssets();
    });
  }

  depositAsset() {
    if (this.amount < this.minAmount || this.amount > this.maxAmount) {
      this.notify.error('x', 'Minimum deposit amount for this coin is ' + this.minAmount +
        'Maximum deposit amount for this coin is ' + this.maxAmount + ' at once');
      return;
    }
    this.depassObserver = this.ntrsrvc.nitroWalletDepositCreate(
      {
        currency: this.selectedDeposit,
        amount: this.amount.toString()
      }
    ).subscribe(data => {
      this.myOrder = data;
      //this.getCryptoStats();
      this.notify.error('x', 'Successfull. We are waiting for your deposit now.');

    });
  }
  exchangeAsset() {
    this.depassObserver = this.ntrsrvc.nitroWalletExchangeCreate(
      {
        from_currency: this.selectedExchnage,
        to_currency: 'trx',
        amount: this.amount.toString(),
        to_wallet_type: 'game_wallet_trx'
      }
    ).subscribe(data => {
      this.getCryptoStats();
      this.getMyownAssets();
      
      this.notifyChangedBalance();
      this.notify.error('x', 'Exchange successfull');

    });
  }

  withdrawalAsset() {
    this.withassObserver = this.ntrsrvc.nitroWalletExchangeCreate(
      {
        from_currency: this.selectedWithdrawal,
        to_currency: 'trx',
        amount: this.amount.toString()
      }
    ).subscribe(data => {
      //this.getCryptoStats();
      this.notify.error('x', 'Exchange successfull');

    });
  }

  getCryptoStats() {
    this.amount = 0;
    this.walletSubscription = this.api.driversBalances().subscribe(data => {

      this.myDriver = data;
      this.mybuyMax = Math.round(data.game_wallet_trx / 100);
      this.mybuyMax = this.mybuyMax - 1;
      const driver = data;
      const together = ((driver.game_wallet_ioi) * this.ticker * 100) +
        (driver.game_wallet_trx * this.ticker);

      this.ioiValue = ((driver.game_wallet_ioi) * this.ticker * 100);
      this.trxValue = (driver.game_wallet_trx * this.ticker);

      this.togetherSum = together;
      if (driver.game_wallet_ioi === 0 && driver.game_wallet_trx === 0) {
        this.leftSum = 50;
        this.rightSum = 50;
      } else if (driver.game_wallet_ioi === 0 && driver.game_wallet_trx !== 0) {
        this.leftSum = 100;
        this.rightSum = 0;
      } else if (driver.game_wallet_trx === 0 && driver.game_wallet_ioi !== 0) {
        this.leftSum = 0;
        this.rightSum = 100;
      } else {
        this.leftSum = together / ((driver.game_wallet_ioi) * this.ticker * 100);
        this.rightSum = 100 - this.leftSum;
      }
      if (driver.game_wallet_ioi > 0 && this.assets !== 2) {
        this.assets++;
      }
      if (driver.game_wallet_trx > 0 && this.assets !== 2) {
        this.assets++;
      }

      setTimeout(() => { this.getChart(); }, 500);
    });
  }


  getTicker() {
    this.tickerSubscription = this.tickerService.tickerPricesRead(1).subscribe(data => {
      this.ticker = data.prices[9].price;
      this.getStaked();
    });
  }


  getMatrics() {
    this.xSubscription = this.eapi.metricsInvestorMetrics().subscribe(data => {
      const x: any = data;
      this.im = x;

    });
  }
  notifyChangedBalance() {
    this.balanceService.balanceHasbeenChanged();
  }


  getExchange() {
    this.getexObserver = this.ntrsrvc.nitroWalletExchangeList(
      {
        fromCurrency: this.selectedExchnage,
        toCurrency: 'trx',
        amount: this.amount.toString()
      }
    ).subscribe(data => {
      this.exchangeActual = data;
    });


  }

  validateExchange() {
    if (this.amount > this.maxAmount) {
      this.amount = this.maxAmount;
    }
  }

  selDep(data: Coin) {
    this.selectedDeposit = data.symbol;
    this.minAmount = Number(data.min_deposit);
    this.amount = this.minAmount;
    this.maxAmount = Number(data.max_deposit);
    this.csfee = Number(data.fee);
  }



  getChart() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#yourCavasId`);

    const tempArr = [];

    tempArr.push(this.leftSum);
    tempArr.push(this.rightSum);
    this.chart = new Chart(htmlRef, {
      type: 'doughnut',
      data: {
        labels: ['IOI', 'TRX'],
        datasets: [
          {
            data: tempArr,
            backgroundColor: ['#FE173F', '#24FFFF'],
            fill: false,
            borderWidth: 0
          },
        ]
      },
      series: [{
        name: '',
        size: 50,
        innerSize: 47,
        pointPadding: 0,
        groupPadding: 0
      }],
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            color: 'red'
          }
        },
        pie: {
          allowPointSelect: false,
          dataLabels: {
            connectorWidth: 0,
            enabled: false
          },
          shadow: false,
          states: {
            hover: {
              enabled: false
            }
          },
        },
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        cutoutPercentage: 93,
        responsive: false
      }
    });
    this.helperBool = true;
  }

  getStaked() {

  }

  patchWallet() {
    this.savingCryptoAddress = true;
    this.nitroObserver = this.ntrsrvc.nitroWalletPartialUpdate({
      my_crypto_address: this.cryptoAddress
    }).subscribe(data => {
      this.identityService.meUpdate();

      setTimeout(() => {
        this.getMydriver();
        this.savingCryptoAddress = false;
        this.editingWallet = false;
      }, 1500);

    });
  }

  getMydriver() {
    const data = this.identityService.getStorageIdentity();
    this.myDriverIdentity = data;

    this.cryptoAddress = data.my_crypto_address;
  }


}
