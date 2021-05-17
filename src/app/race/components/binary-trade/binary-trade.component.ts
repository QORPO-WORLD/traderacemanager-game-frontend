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
  @ViewChild("unityRace", { static: false }) raceComp: any;
  chart: any;
  myCoin: any;
  socket$: WebSocketSubject<any> = webSocket({
    url: 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg',
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
    popsock.on("connect", function () {
      console.log('connected')
    });
    let _this = this;
    popsock.on("message", function (data) {
      _this.avatarMsg(data);
    });

    this.config = {
      type: 'line',
      data: {
        datasets: [{
          label: 'Dataset 1 (linear interpolation)',
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
    }, 100);
    setTimeout(() => {
      this.addData();
    }, 3000);

    this.price$ = this.getLatestPrice();
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
    this.onRefresh();
    this.chart.update();
  }

  addDataset() {
    const colorName = this.colorNames[this.config.data.datasets.length % this.colorNames.length];
    const newColor = this.chartColors[colorName];
    const newDataset: any = {
      label: 'Dataset ' + (this.config.data.datasets.length + 1),
      backgroundColor: this.color(newColor).alpha(0.5).rgbString(),
      borderColor: newColor,
      fill: false,
      data: []
    };

    this.config.data.datasets[0].push(newDataset);
    this.chart.update();
  }

  add() {
    if (this.chart) {

      if (this.currentValue > 0) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        this.chart.data.datasets[0].data.push(this.currentValue);
        this.chart.data.labels.push(today.toDateString());
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

  updatePlotLine(chart: any) {
    this.plotYvalue = this.currentValue;
    chart.yAxis[0].removePlotBand('line');
    chart.yAxis[0].addPlotLine({
      color: 'red',
      dashStyle: 'Solid',
      value: this.plotYvalue,
      width: 2,
      label: { align: 'right', text: '' + this.plotYvalue, x: -10, useHTML: true },
      zIndex: 10,
      id: 'line'
    })
  }

  adjustChartAxis() {

    const min = Math.min(...this.chartData);
    const max = Math.max(...this.chartData);

    if (min !== 0) {
      this.chartMin = min;
    }

    if (max !== 0) {
      this.chartMax = max;
    }

    if (this.chartData.length > 20) {
      this.chartData.shift();
      this.chart.series[0].data[0].remove(true, true);
    }

    if (this.currentValue > this.chartMax) {
      this.chart.yAxis[0].update({
        max: this.chartMax,
        min: this.chartMin
      });
    }

    if (this.currentValue < this.chartMin) {
      this.chart.yAxis[0].update({
        min: this.chartMin,
        max: this.chartMax
      });
    }
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
        "room": "random_room_name",
        "data": JSON.stringify(msg)
      });
    setTimeout(() => {
      this.locked = false;
    }, 2000);
  }


  async initCcxt() {
    let bitfinex = new ccxt.bitfinex({ verbose: true });
    this.btcmeno = await bitfinex.fetchTicker('BTC/USD');
    const p = this.btcmeno['average'] * Math.random();
    this.mainChart.push(p);
  }

  updateChart() {
    this.lineChart.series[0].setData(...this.mainChart);
    this.lineChart.redraw();
  }

  async runScheduler() {

  }


  getLatestPrice() {
    return this.socket$.pipe(
      map((t: Trade) => t.type === 'trade' && t.data[0].p.toFixed()),
      distinctUntilChanged(),
      tap(d => this.setPriceToGraph(d)),
      catchError(_ => EMPTY)
    )
  }

  setPriceToGraph(data) {
    const time = Date.now();
    this.currentValue = data;

    this.add();
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
}
