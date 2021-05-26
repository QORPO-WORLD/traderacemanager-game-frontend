import { RacesService } from 'src/app/api/services';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/user/services/auth.service';
import { map, catchError, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, Subscription } from 'rxjs';
declare let ccxt: any;
let popsock = (window as any).kocksock;
import io from "socket.io-client"
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ActivatedRoute } from '@angular/router';
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
export class BinaryTradeComponent implements OnInit {
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
  constructor(private identityService: AuthService, private raceApi: RacesService, private actv: ActivatedRoute) {
    this.raceHash = this.actv.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getBinaryPlayers();
    this.getMyDriver();
    this.initPopSock();
    this.initChartConfig();
    this.initCcxtTicker();
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
          console.log(data);
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
        }]
      },
      options: {
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              duration: 20000,
              refresh: 1000,
              delay: 2000,

            }
          },
          y: {
            title: {
              display: true,
              text: 'value'
            }
          }
        },
        interaction: {
          intersect: false
        },
        plugins: {
          tooltip: {
            enabled: true
          },
          title: {
            display: true,
            text: 'BTC/UDST'
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
    if (this.chart) {
      if (valV > 0) {
        this.chart.data.datasets[0].data.push(valV);
        this.chart.data.datasets[0].pointStyle.push('circle');
        this.chart.data.labels.push(tdate);
        if (this.chart.data.datasets[0].data.length > 20) {
          this.chart.data.datasets[0].data.shift();
          this.chart.data.datasets[0].pointStyle.shift();
          this.chart.data.labels.shift();
        }
        this.chart.update();
      }
    }
  }

  makeItStop() {
    clearInterval(this.chartInterval);
  }


  // websocket to chart section


  addFromPlayer(timeV: any, valV: number, long?: boolean, me?: boolean) {
    if (me === true) {
      this.optWaiting = 10;
    }

    timeV = Date.now();
    valV = this.currentValue;
    const tdate = new Date(timeV).toLocaleTimeString();
    this.currentValue = valV;
    if (this.chart) {

      if (valV > 0) {
        const imag = new Image();
        long === true ? imag.src = '/assets/base/images/binary/long.png' : imag.src = '/assets/base/images/binary/short.png';
        me === true ? imag.src = '/assets/base/images/binary/oponent-long.png' : imag.src = '/assets/base/images/binary/oponent-short.png';
        this.chart.data.datasets[0].data.push(valV);
        this.chart.data.datasets[0].pointStyle.push(imag);
        this.chart.data.labels.push(tdate);

        if (this.chart.data.datasets[0].data.length > 20) {
          this.chart.data.datasets[0].data.shift();
          this.chart.data.labels.shift();
        }

        this.chart.update();
      }
    }
  }



  addFromDecision(lplayer: boolean, shot: boolean) {
    const imag = new Image();
    if (lplayer === true) {
      shot === false ? imag.src = '/assets/base/images/binary/bad.png' : imag.src = '/assets/base/images/binary/good.png';
    } else {
      shot === false ? imag.src = '/assets/base/images/binary/oponent-bad.png' : imag.src = '/assets/base/images/binary/oponent-good.png';
    }

    const timeV = Date.now();
    const valV = this.currentValue;
    const tdate = new Date(timeV).toLocaleTimeString();
    this.currentValue = valV;
    if (this.chart) {

      if (valV > 0) {
        this.chart.data.datasets[0].data.push(valV);
        this.chart.data.datasets[0].pointStyle.push(imag);
        this.chart.data.labels.push(tdate);

        if (this.chart.data.datasets[0].data.length > 20) {
          this.chart.data.datasets[0].data.shift();
          this.chart.data.labels.shift();
        }
        this.chart.update();
      }
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
      console.log(data);
      const opt = JSON.parse(data);
      _this.onOption(opt);
    });

    popsock.on("option_closed", function (data) {
      console.log(data);
      const opt = JSON.parse(data);
      _this.onOptionClosed(opt);

      // mock
      const x = {
        "uh": "20d6a67d2f0adecd643edab73e1fbbab",
        "ts": 1622033257, "result": false,
        "ap": "40114.62", "roi": "0.0"
      }
    });

    popsock.on("status", function (data) {
      console.log(data);
      const opt = JSON.parse(data);
      _this.onStatus(opt);
    });

    popsock.on("score", function (data) {
      console.log(data);
      _this.onScore(data);
    });

    popsock.on("message", function (data) {
      _this.avatarMsg(data);
    });
  }

  onOption(data?: any) {
    const opt = JSON.parse(data);
    opt.uh === this.players[0].user_hash ? this.addFromPlayer(opt.ts, opt.ap, opt.long, true) : this.addFromPlayer(opt.ts, opt.ap, opt.long, false);
  }

  onOptionClosed(data?: any) {
    const opt = JSON.parse(data);
    opt.uh === this.players[0].user_hash ? this.addFromDecision(true, opt.result) : this.addFromDecision(true, opt.result);
  }

  onScore(data?: any) {
    const opt = JSON.parse(data);
    if (opt.uh === this.players[0].user_hash) {
      this.myShots.push(opt.result);
    } else {
      this.oponentShots.push(opt.result);
    }
  }

  onStatus(data?: any) {

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
        "room": this.roomName,
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
      while (true) {
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
}
