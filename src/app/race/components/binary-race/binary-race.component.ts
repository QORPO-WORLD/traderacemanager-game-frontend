import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Chart as lineChart } from 'angular-highcharts';

declare let ccxt: any;
declare let ccxws: any;
import Highcharts from 'highcharts';
@Component({
  selector: 'app-binary-race',
  templateUrl: './binary-race.component.html',
  styleUrls: ['./binary-race.component.scss'],
})
export class BinaryRaceComponent implements OnInit {
  btcinterval: any;
  btcmeno: any;
  mainChart = [];
  lineChart: any;
  raceStep = 1;
  chartData = [[1,1], [2,2], [3,3]];
  timeStamp = 3;
  chartInterval: any;
  currentValue: number;
  plotYvalue = 2;
  constructor() { }

  ngOnInit() {let chart = Highcharts.chart('container',{
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'my chart'
    },
    series: [{
        name: 'Price',
        type: 'areaspline',
        data: [...this.chartData]
    }]
  });

  this.chartInterval = setInterval(() => {
    this.add(chart);
    this.updatePlotLine(chart);
  }, 1000);
}

add(chart: any) {
  this.currentValue = Math.floor(Math.random() * 10);
  this.timeStamp++;
  chart.series[0].addPoint([this.timeStamp, this.currentValue]);
}

updatePlotLine(chart: any){
  this.plotYvalue = this.currentValue;
  chart.yAxis[0].removePlotBand('line');
  chart.yAxis[0].addPlotLine({
    color: 'red',
    dashStyle: 'Solid',
    value: this.plotYvalue,
    width: 2,
    label: {align: 'right', text: '' + this.plotYvalue, x: -10, useHTML: true},
    zIndex: 10,
    id: 'line'
  })
}

makeItStop(){
  clearInterval(this.chartInterval);
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

  fireBtc() {
    this.btcinterval = setInterval(() => {

    }, 1000);
  }

  getLineChart() {
    this.lineChart = new lineChart({
      chart: {
        type: 'areaspline',
        backgroundColor: null
      },
      xAxis: {
        visible: true
      },
      yAxis: {
        visible: true,
        tickAmount: 4,
        gridLineColor: '#ffffff10',
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        shared: true,
        valueSuffix: ' TRX'
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0
        },
        series: {
          enableMouseTracking: false,
          marker: {
            enabled: false
          },
          states: {
            hover: {
              enabled: false
            }
          }
        }
      },
      series: [
        {
          name: '',
          type: 'areaspline',
          data: [...this.mainChart]
        }
      ]
    });
  }

  createChart() {
      
  }

  updateChart() {
    this.lineChart.series[0].setData(...this.mainChart);
    this.lineChart.redraw();
  }
}
