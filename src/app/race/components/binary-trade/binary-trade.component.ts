import { RacesService } from 'src/app/api/services';
import { timeStamp } from 'console';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Chart as lineChart } from 'angular-highcharts';
import { AuthService } from 'src/app/user/services/auth.service';
import { map, catchError, distinctUntilChanged, pairwise, tap } from 'rxjs/operators';
import { Observable, Subject, EMPTY, of, interval, Subscription } from 'rxjs';
declare let ccxt: any;
declare let sxc: any;

import { min } from 'rxjs/operators';
import io from "socket.io-client"
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ActivatedRoute } from '@angular/router';
import { jsonpFactory } from '@angular/http/src/http_module';
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

  @ViewChild("unityRace", { static: false }) raceComp: any;
  chart: any;
  myCoin: any;
  socket$: WebSocketSubject<any> = webSocket({
    url: 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg',
    //url: 'http://dev-api.traderacemanager.com/binary-socket/socket.io',
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
  constructor(private identityService: AuthService, private raceApi: RacesService, private actv: ActivatedRoute) { }

  ngOnInit() {
    
    this.mainSocket = io("https://dev-api.traderacemanager.com", {
      path: "/binary-socket/socket.io",
     
        auth:{
          user_hash: "ado",
          auth_token: "12345",
          room_name: 'random_room_name'
        }
      
    });



    this.mainSocket.on("connect", function() {
      console.log("Client connected")!;
      this.mainSocket.emit("client_triggered_send", { "user": "ado", "room": "random_room_name", "data": "MyMessage" });
      console.log(this.mainSocket)!;

    });

    this.mainSocket.on("message", function(data) {
      console.log(data);
      if (data === '2|1') {
        this.helloOponent();
      }
      if (data === '1|1') {
        this.hello();
      }
    });

    

    //socket.emit("client_triggered_send", { "user": "janko", "room": "random_room_name", "data": "MyMessage" });
    

    //this.socket = io.connect(this.SOC_URL, { query: { token: this.token }, 'forceNew': true });
 

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
    this.raceHash = this.actv.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.chart = new Chart('canvas', this.config);
      console.log('first');
      this.config.options.scales.x.onRefresh = this.onRefresh();
    }, 100);
    setTimeout(() => {
      this.addData();
    }, 3000);



    //this.runScheduler();
    this.getMyDriver();
    this.price$ = this.getLatestPrice();
  }



  onRefresh() {
    console.log('second');
    console.log(this.chart);
    if (this.chart) {
      const now = Date.now();
      this.chart.data.datasets[0].data.push({
        x: now,
        y: this.currentValue

      });
      console.log(this.chart.data.datasets[0].data);
      if (this.chart.data.datasets[0].data.length > 20) {
        console.log(this.chart.data.datasets[0].data);
        this.chart.data.datasets[0].data.shift();
        console.log(this.chart.data.datasets[0].data);
      }
    }

  }

  addData() {
    this.onRefresh();
    this.chart.update();
  }

  addDataset() {
    console.log('2d3');
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
    console.log('updated');
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

  hello() {
    this.raceComp.hello();
  }
  yo() {
    this.raceComp.yo();
  }
  good() {
    this.raceComp.good();
  }
  helloOponent() {
    this.raceComp.helloOponent();
  }

  async initCcxt() {


    //let kraken = new ccxt.kraken();
    let bitfinex = new ccxt.bitfinex({ verbose: true });
    //let huobipro = new ccxt.huobipro();

    this.btcmeno = await bitfinex.fetchTicker('BTC/USD');
    const p = this.btcmeno['average'] * Math.random();
    this.mainChart.push(p);


    //console.log(test);

    //console.log(kraken);
    /*
    console.log(kraken);
     console.log(bitfinex);
     console.log(huobipro);
 */
    //console.log(kraken.id, await kraken.loadMarkets());
    //console.log(bitfinex.id, await bitfinex.loadMarkets());
    //console.log(huobipro.id, await huobipro.loadMarkets());
    //let okcoinusd = new ccxt.okcoinusd();

    //let okcoinusd = new ccxt.okcoinusd();

    /*
        const exchangeId = 'binance'
          , exchangeClass = ccxt[exchangeId]
          , exchange = new exchangeClass({
            'apiKey': 'uKAKx1tLaVm6YTvurr7fJpYnOxEpnSFpTTNIb67rJVcy7btOhfBNI6CZfLlVSd5v',
            'secret': 'nUDGTt22dbSwaUVisuincnEJFBqisjKmmuLT5vokFERrAf31UIu1evKI6LQYwJ3r',
            'timeout': 30000,
            'enableRateLimit': true,
          });
        console.log('got here');
    
        console.log(kraken.id, await kraken.loadMarkets());
        console.log(bitfinex.id, await bitfinex.loadMarkets());
        console.log(huobipro.id, await huobipro.loadMarkets());
    
        console.log(kraken.id, await kraken.fetchOrderBook(kraken.symbols[0]));
        console.log(bitfinex.id, await bitfinex.fetchTicker('BTC/USD'));
        console.log(huobipro.id, await huobipro.fetchTrades('ETH/USDT'));
    */
    //console.log(okcoinusd.id, await okcoinusd.fetchBalance());

    // sell 1 BTC/USD for market price, sell a bitcoin for dollars immediately
    //console.log(okcoinusd.id, await okcoinusd.createMarketSellOrder('BTC/USD', 1));

    // buy 1 BTC/USD for $2500, you pay $2500 and receive ฿1 when the order is closed
    //console.log(okcoinusd.id, await okcoinusd.createLimitBuyOrder('BTC/USD', 1, 2500.00));

    // pass/redefine custom exchange-specific order params: type, amount, price or whatever
    // use a custom order type
    //bitfinex.createLimitSellOrder('BTC/USD', 1, 10, { 'type': 'trailing-stop' });


  }

  updateChart() {
    this.lineChart.series[0].setData(...this.mainChart);
    this.lineChart.redraw();
  }

  async runScheduler() {
    /*
     const exchange = new ccxt.binance({ enableRateLimit: true });
  if (exchange.has['watchTicker']) {

    try {
      const ticker = await exchange.watchTicker('BTC/USDT');
      this.myCoin = {
        time: ticker.timeStamp,
        value: ticker.last
      };
    } catch (e) {
      console.log(e)
      // stop the loop on exception or leave it commented to retry
      // throw e
    }

  }

 
     this.chartInterval = setInterval(() => {
    this.add();
    this.updatePlotLine(this.chart);
  }, 5000);
  */


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

  getDirection() {
    return this.getLatestPrice().pipe(
      pairwise(),
      // tap(d => {
      //   console.log(`Current val ${d[1]} > ${d[0]} `, d[1] > d[0])
      // }),
      map(arr => arr[0] < arr[1] ? 'green' : 'red')
    )
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
}
