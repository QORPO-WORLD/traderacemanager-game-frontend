import { timeStamp } from 'console';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Chart as lineChart } from 'angular-highcharts';
import { AuthService } from 'src/app/user/services/auth.service';
import { map, catchError, distinctUntilChanged, pairwise, tap } from 'rxjs/operators';
import { Observable, Subject, EMPTY, of, interval } from 'rxjs';
declare let ccxt: any;

import { min } from 'rxjs/operators';

import { webSocket, WebSocketSubject } from "rxjs/webSocket";
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
  myChart: any;
  myCoin: any;
  socket$: WebSocketSubject<any> = webSocket({
    url: 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg',
    openObserver: {
      next: () => {
        this.socket$.next({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' });
      }
    },
  });
  price$: Observable<any>;
  direction$: Observable<any> = of('green');
  chart: any;
  constructor(private identityService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.chart = new Chart('canvas', {
        type: "line",
        options: {
          responsive: true,
          title: {
            display: false,
            text: 'Real Time Chart'
          }
        },
        data: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: "BTC price",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#e8c3b9", "#8e5ea2", "#3e95cd"],
              fill: true
            }
          ]
        }

      });

    }, 100);

    //this.runScheduler();
    this.getMyDriver();
    this.price$ = this.getLatestPrice();
  }

  add() {
    console.log(this.currentValue);
    if (this.currentValue > 0) {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      this.chart.data.datasets[0].data.push(this.currentValue);
      this.chart.data.labels.push(today.toDateString());

      this.chart.update();
    }
    /*
    this.currentValue = Math.floor(this.currentValue);

    this.timeStamp++;
    this.chartData.push(this.currentValue);
    this.myChart.series[0].addPoint([(this.timeStamp / 1000), this.currentValue]);
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
      this.myChart.series[0].data[0].remove(true, true);
    }

    if (this.currentValue > this.chartMax) {
      this.myChart.yAxis[0].update({
        max: this.chartMax,
        min: this.chartMin
      });
    }

    if (this.currentValue < this.chartMin) {
      this.myChart.yAxis[0].update({
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
    this.updatePlotLine(this.myChart);
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
}
