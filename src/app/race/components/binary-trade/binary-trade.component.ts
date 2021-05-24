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

  gameObserver: Subscription;
  raceHash: string;
  long: boolean;
  loadingCont = false;
  chartColors = {
    red: 'rgb(255, 99, 132)',
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
  emptyShots = 5;
  goodShots = 0;
  badShots = 0;
  oponentEmptyShots = 5;
  oponentGoodShots = 0;
  oponentBadShots = 0;
  constructor(private identityService: AuthService, private raceApi: RacesService, private actv: ActivatedRoute) {
    this.raceHash = this.actv.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getBinaryPlayers();
    this.getMyDriver();
    popsock = io("https://dev-api.traderacemanager.com", {
      path: "/binary-socket/socket.io",
      auth: {
        user_hash: "ado",
        auth_token: "12345",
        room_name: 'random_room_name'
      }

    });

    popsock.on("option", function (data) {
      console.log(data);
      const opt = JSON.parse(data);
      console.log(opt);
    });

    popsock.on("score", function (data) {
      console.log(data);
      // key = user hash as key & boolean
      const opt = JSON.parse(data);
      const user = data.key;
      const boolik = true;
      if (user === this.myId) {
        this.emptyShots--;
        boolik ? this.goodShots++ : this.badShots++;
      } else {
        this.oponentEmptyShots--;
        boolik ? this.oponentGoodShots++ : this.oponentBadShots++;
      }
    });

    let _this = this;
    popsock.on("message", function (data) {
      _this.avatarMsg(data);
    });

    this.config = {
      type: 'line',
      data: {
        datasets: [{
          label:'left user',
          backgroundColor: this.color(this.chartColors.red).alpha(0.5).rgbString(),
          borderColor: this.chartColors.red,
          fill: false,
          data: []
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
          title: {
            display: true,
            text: 'Line chart (hotizontal scroll) sample'
          }
        }
      }
    };

    setTimeout(() => {
      this.chart = new Chart('canvas', this.config);
      this.config.options.scales.x.onRefresh = this.onRefresh();
    }, 100)
    /*
    setTimeout(() => {
      this.addData();
    }, 3000);
*/
    this.initCcxtTicker();
  }



  onRefresh() {
    console.log('going');
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
        this.chart.data.labels.push(tdate);
        if (this.chart.data.datasets[0].data.length > 20) {
          this.chart.data.datasets[0].data.shift();
          this.chart.data.labels.shift();
        }
        this.chart.update();
      }
    }
    /*
    this.currentValue = Math.floor(this.currentValue);

    this.timeStamp++;
    this.chartData.push(this.currentValue);
    this.chart.series[0].addPoint([(this.timeStamp / 1000), this.currentValue]);
    this.adjustChartAxis();
    */
  }

  getMyDriver() {
    this.myDriverStats = this.identityService.getDriverMe();
  }

  makeItStop() {
    clearInterval(this.chartInterval);
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

  getBinaryPlayers() {
    this.raceApi.binaryPlayers(
      this.raceHash
    ).subscribe(data => {
      const datax: any = data;
      this.resolveAvatars(datax);
    });
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
          //console.log(new Date(), ticker);
          //this.price$ = ticker.last;
          this.add(ticker.timestamp, ticker.last)
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}
