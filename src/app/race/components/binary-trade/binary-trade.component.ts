import { Axis } from 'highcharts';
import { RacesService } from 'src/app/api/services';

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/user/services/auth.service';
import { map, catchError, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, Subscription } from 'rxjs';
declare let ccxt: any;
let popsock = (window as any).kocksock;
import io from "socket.io-client"
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
export interface Trade {
  data: {
    p: number,
    s: string,
    t: number,
    v: number
  }[],
  type: string
}

@Component({
  selector: 'app-binary-trade',
  templateUrl: './binary-trade.component.html',
  styleUrls: ['./binary-trade.component.scss'],
})
export class BinaryTradeComponent implements OnInit, OnDestroy {
  btcinterval: any;
  btcmeno: any;
  mainChart = [];
  lineChart: any;
  raceStep = 1;
  chartData = [];
  timeStamp = 1000;
  chartInterval: any;
  currentValue: number;
  plotYvalue = 2;
  chartMax: number;
  chartMin: number;
  menuOpen = false;
  myDriverStats: any;
  raceEnded = false;
  mePlaying = false;
  locked = false;
  players = [];
  myPlayer: any;
  @ViewChild("unityRace") raceComp: any;
  chart: any;
  myCoin: any;
  /*
  socket$: WebSocketSubject<any> = webSocket({
    //url: 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg',
    url: 'https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=1000',
    openObserver: {
      next: (data) => {
        console.log(data);
        this.socket$.next({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' });
      }
    },
  });
  price$: Observable<any>;
  direction$: Observable<any> = of('green');
*/
  gameObserver: Subscription;
  raceHash: string;
  long: boolean;
  loadingCont = false;
  chartColors = {
    red: 'rgb(255,255,255)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
  color = Chart.helpers.color;
  config: any;
  colorNames = Object.keys(this.chartColors);
  mainSocket: any;
  myId: string;
  roomName = "random_room_name";
  myShots = [];
  oponentShots = [];
  optWaiting = 0;
  roileft: number;
  roiright: number;
  ccxtInterval: any;
  winners = [];
  winner: any;
  loser: any;
  meWon: boolean;
  unityEnabled = true;
  chartEnabled = true;
  balance: any;
  startsAt: number;
  finishingAt: any;
  startsInSecs: number;
  constructor(private identityService: AuthService, private raceApi: RacesService, private actv: ActivatedRoute) {
    this.raceHash = this.actv.snapshot.paramMap.get('id');
    this.startsAt = Number(this.actv.snapshot.paramMap.get('starts'));
  }

  ngOnInit() {
    this.startsInSecs = this.getWhenStarts();
    this.getBinaryPlayers();
    this.getMyDriver();
    this.initPopSock();
    this.initChartConfig();
    this.initCcxtTicker();
    this.balance = this.identityService.getBalance().game_wallet_ioi;
  }

  ngOnDestroy() {
    if (this.ccxtInterval) {
      clearInterval(this.ccxtInterval)
    }
  }


  getBinaryPlayers() {
    this.raceApi.binaryPlayers(
      this.raceHash
    ).subscribe(data => {
      const datax: any = data;
      this.resolveAvatars(datax);
    });
  }

  getMyDriver() {
    this.myDriverStats = this.identityService.getDriverMe();
  }

  placeOption() {
    if (this.loadingCont === false) {
      this.loadingCont = true;
      this.gameObserver = this.raceApi.binaryOption({
        "race_hash": this.raceHash,
        "long": this.long
      }).subscribe(
        data => {
          this.optWaiting = 10;
        }
      )
    }

    setTimeout(() => {
      this.loadingCont = false;
    }, 500)
  }

  initChartConfig() {
    let ctx, canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(130, 130, 130, 1)');
    gradient.addColorStop(1, 'rgba(34, 34, 34, 0)');

    setTimeout(() => {
      this.chart = new Chart('canvas', this.config);
      this.config.options.scales.x.onRefresh = this.onRefresh();
    }, 100)
    Chart.defaults.global.legend.display = false;
    this.config = {
      type: 'line',
      data: {
        datasets: [{
          label: 'BTC/USDT',
          backgroundColor: gradient,
          borderColor: this.chartColors.red,
          fill: true,
          data: [],
          lineTension: 0.1,
          pointStyle: []
        },{
          label: 'BTC/USDT',
          backgroundColor: gradient,
          borderColor: this.chartColors.red,
          fill: true,
          data: [],
          lineTension: 0.1,
          pointStyle: []
        }]
      },
      options: {
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              duration: 20000,
              refresh: 1500,
              delay: 3000,

            }
          },
          yAxes: [{
            display: true,
            position: 'right',
            ticks: {
              fontColor: "#868686",
            }
          }],
          xAxes: [{
            display: true,
            ticks: {
              fontColor: "#868686",
            }
          }]
        },
        interaction: {
          intersect: false
        },
        plugins: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
  }



  onRefresh() {
    if (this.chart) {
      const now = Date.now();
      this.chart.data.datasets[0].data.push({
        x: now,
        y: this.currentValue

      });
      if (this.chart.data.datasets[0].data.length > 20) {
        this.chart.data.datasets[0].data.shift();
      }
    }

  }

  addData() {
    console.log('adding data');
    this.onRefresh();
    this.chart.update();
  }


  add(timeV: string, valV: number) {

      const tdate = new Date(timeV).toLocaleTimeString();
      this.currentValue = valV;

      this.chart.data.datasets[0].data.push(valV);
      this.chart.data.datasets[0].pointStyle.push('circle');
      this.chart.data.labels.push(tdate);
      if (this.chart.data.datasets[0].data.length > 20) {
        //this.chart.data.datasets[0].data.shift();
        //this.chart.data.datasets[0].pointStyle.shift();
        //this.chart.data.labels.shift();
      }

  }


  makeItStop() {
    clearInterval(this.chartInterval);
  }


  // websocket to chart section


  addFromPlayer(timeV: any, valV: number, long?: boolean, me?: boolean) {



    const tdate = new Date(timeV).toLocaleTimeString();

        let imag = new Image();
        if (me === false) {
          long === true ? imag.src = '/assets/base/images/binary/oponent-long.png' : imag.src = '/assets/base/images/binary/oponent-short.png';
        }
        if (me === true) {
          long === true ? imag.src = '/assets/base/images/binary/long.png' : imag.src = '/assets/base/images/binary/short.png';
        }
        this.chart.data.datasets[0].data.push(valV);
        this.chart.data.datasets[0].pointStyle.push(imag);
        this.chart.data.labels.push(tdate);

        if (this.chart.data.datasets[0].data.length > 20) {
          // this.chart.data.datasets[0].data.shift();
          // this.chart.data.labels.shift();
        }

        this.chart.update();

  }



  addFromDecision(lplayer: boolean, shot: boolean, timeV: number, valV: number) {
    const imag = new Image();
    const tdate = new Date(timeV).toLocaleTimeString();

    if (lplayer === true) {
      shot === false ? imag.src = '/assets/base/images/binary/bad.png' : imag.src = '/assets/base/images/binary/good.png';
    }
    if (lplayer === false) {
      shot === false ? imag.src = '/assets/base/images/binary/oponent-bad.png' : imag.src = '/assets/base/images/binary/oponent-good.png';
    }
    console.log(valV);
    console.log(tdate);
    this.chart.data.datasets[0].data.push(valV);
    this.chart.data.datasets[0].pointStyle.push(imag);
    this.chart.data.labels.push(tdate);

    if (this.chart.data.datasets[0].data.length > 20) {
      // this.chart.data.datasets[0].data.shift();
      // this.chart.data.labels.shift();
    }

    
  }





  // websocket section starts here

  initPopSock() {
    let _this = this;
    popsock = io("https://dev-api.traderacemanager.com", {
      path: "/binary-socket/socket.io",
      auth: {
        user_hash: "ado",
        auth_token: "12345",
        room_name: 'vs_' + this.raceHash
      }
    });

    popsock.on("option", function (data) {

      const opt = JSON.parse(data);
      _this.onOption(opt);
    });

    popsock.on("option_closed", function (data) {

      const opt = JSON.parse(data);
      _this.onOptionClosed(opt);

    });

    popsock.on("status", function (data) {

      const opt = JSON.parse(data);
      _this.onStatus(opt);
    });

    popsock.on("winners", function (data) {
      console.log(data);
      const opt = JSON.parse(data);
      _this.onWinners(opt);
    });

    popsock.on("score", function (data) {
      const opt = JSON.parse(data);
      _this.onScore(opt);
    });

    popsock.on("message", function (data) {
      _this.avatarMsg(data);
    });
  }

  onOption(data?: any) {
    const opt = data;
    opt.uh === this.myId ? this.addFromPlayer(opt.ts, opt.ap, opt.long, true) : this.addFromPlayer(opt.ts, opt.ap, opt.long, false);
  }

  onOptionClosed(data?: any) {
    const opt = data;
    opt.uh === this.myId ? this.addFromDecision(true, opt.result, opt.ts, opt.ap) : this.addFromDecision(false, opt.result, opt.ts, opt.ap);
  }

  onWinners(data?: Array<any>) {

    const win = data.filter((item) => {
      return item.win === true
    });
    const lose = data.filter((item) => {
      return item.win === false
    });

    this.winner = win[0];
    this.loser = lose[0];
    this.winner.uh === this.myId ? this.meWon = true : this.meWon = false;
    this.meWon === false ? this.unityEnabled === false : null;
    this.raceEnded = true;
  }

  onScore(data?: any) {
    const opt = data;
    if (opt.uh === this.myId) {
      this.myShots = data.p;
      this.roileft = data.r;
    } else {
      this.oponentShots = data.p;
      this.roiright = data.r;
    }
  }

  onStatus(data?: any) {
    /*
     if (data.type === 'countdown') {
       if (data.s === 10) {
         this.optWaiting = 10;
       }
     }
     */
  }


  avatarMsgLocal(msg: any) {
    this.raceComp.yo(msg);
  }

  avatarMsg(msg: any) {
    this.raceComp.yo(JSON.parse(msg));
  }

  sendSockAvatarMsg(msg: any) {
    this.locked = true;
    popsock.emit("client_triggered_emit",
      {
        "event": "message",
        "user": this.myId,
        "room": 'vs_' + this.raceHash,
        "data": JSON.stringify(msg)
      });
    setTimeout(() => {
      this.locked = false;
    }, 2000);
  }


  resolveAvatars(data: Array<{
    user_id: string;
    user_hash: string;
    user_nickname: string;
  }>) {
    this.myId = this.identityService.getDriverMe().id;

    for (const el of data) {
      if (el.user_hash === this.myId) {
        this.mePlaying = true;
        this.myPlayer = el;
      }
    }

    if (this.mePlaying === true) {
      this.players.push(this.myPlayer);

      for (const el of data) {
        if (el.user_hash !== this.myId) {
          this.players.push(el);
        }
      }
    } else {
      this.players = data;
    }
  }


  async fetchTickers(exchange) {
    let tickers;
    try {
      // await exchange.loadMarkets () // optional
      tickers = await exchange.fetchTickers();
    } catch (e) {
      console.error(e.constructor.name, e.message);
    }
    return tickers;
  }

  async initCcxtTicker() {
    const enableRateLimit = true;
    const binancex = new ccxt.binance({ enableRateLimit, options: {} });

    if (binancex.has['watchTicker']) {
      while (this.chartEnabled === true) {
        try {
          const ticker = await binancex.watchTicker('BTC/USDT', {});
          this.add(ticker.timestamp, ticker.last)
        } catch (e) {
          console.log(e);
        }
      }
    }

  }


  optTimerCompleted(event) {
    setTimeout(() => {
      this.optWaiting = 0;
    }, 1000);
  }

  fatality() {
    this.raceComp.fatality();
    setTimeout(() => {
      this.unityEnabled = false;
    }, 3000);
  }


  getWhenStarts() {
    const then: any = new Date(this.startsAt * 1000);
    const now: any = DateTime.utc();
    const diffTime = Math.abs((then - now.ts) / 1000);

    return diffTime;
  }
}
