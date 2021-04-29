import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Chart as lineChart } from 'angular-highcharts';
import { AuthService } from 'src/app/user/services/auth.service';

declare let ccxt: any;
declare let ccxws: any;
import Highcharts, { Axis } from 'highcharts';
import { min } from 'rxjs/operators';
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
  chartData = [];
  timeStamp = 1000;
  chartInterval: any;
  currentValue: number;
  plotYvalue = 2;
  chartMax = 54500;
  chartMin = 54000;
  menuOpen = false;
  myDriverStats: any;
  raceEnded = true;

  @ViewChild("unityRace", { static: false }) raceComp: any;

  constructor(private identityService: AuthService) { }

  ngOnInit() {
      let chart = Highcharts.chart('container',{
      chart: {
          type: 'areaspline',
          scrollablePlotArea: {
            minWidth: 100,
            scrollPositionX: 1
          }
      },
      yAxis: {
        offset: 50,
        labels: {
          align: 'right'
        },
        opposite: true,
        max: this.chartMax,
        min: this.chartMin
      },
      series: [{
          name: 'Price',
          type: 'areaspline',
          data: [...this.chartData]
      }]
    });
    let counter = 0;

    this.chartInterval = setInterval(() => {
      this.add(chart);
      this.updatePlotLine(chart);
      counter++;
      if (counter === 10) {
        this.makeItStop();
      }
    }, this.timeStamp);

    this.getMyDriver();

  }

  add(chart: any) {
    this.currentValue = Math.floor(Math.random() * (60000 - 54000 + 1)) + 54000;
    this.timeStamp++;
    this.chartData.push(this.currentValue);
    chart.series[0].addPoint([(this.timeStamp / 1000), this.currentValue]);
    this.adjustChartAxis(chart);
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

  adjustChartAxis(chart: any){

    if (this.chartData.length > 20) {
      this.chartData.shift();
      chart.series[0].data[0].remove(true, true);
    }

    if (this.currentValue > this.chartMax) {
      this.chartMax = this.currentValue;
      chart.yAxis[0].update({
        max: this.chartMax
    });
    }

    if (this.currentValue < this.chartMin) {
      this.chartMax = this.currentValue;
      chart.yAxis[0].update({
        min: this.chartMin
    });
    }
  }

  getMyDriver(){
    this.myDriverStats = this.identityService.getDriverMe();
  }

  makeItStop(){
    clearInterval(this.chartInterval);
  }

  hello(){
    this.raceComp.hello();
  }
  yo(){
    this.raceComp.yo();
  }
  good(){
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
