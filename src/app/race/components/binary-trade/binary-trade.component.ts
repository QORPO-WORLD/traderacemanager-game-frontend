import { NotifiqService } from './../../../common/services/notifiq.service';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Axis } from 'highcharts';
import { RacesService } from 'src/app/api/services';

import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/user/services/auth.service';
import { map, catchError, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, Subscription, Subject } from 'rxjs';
declare let ccxt: any;
let popsock = (window as any).kocksock;
import io from "socket.io-client"
//import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import 'chartjs-plugin-streaming';

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
  semaforsVisible = false;
  balance: any;
  startsAt: number;
  finishingAt: any;
  startsInSecs: number;
  chartStream: Subject<any> = new Subject();;
  chartSubscription: Subscription;
  pushing = false;
  semaforVal = 5;
  chartTemp: any;
  showChart = true;
  startVal: number;
  @ViewChild('optionPlaced') optionPlaced: ElementRef;
  @ViewChild('oponentOptionPlaced') oponentOptionPlaced: ElementRef;
  @ViewChild('optionWin') optionWin: ElementRef;
  @ViewChild('optionWinOponent') optionWinOponent: ElementRef;
  @ViewChild('optionLoose') optionLoose: ElementRef;
  @ViewChild('optionLooseOponent') optionLooseOponent: ElementRef;
  @ViewChild('meLoose') meLoose: ElementRef;
  @ViewChild('meWin') meWin: ElementRef;
  @ViewChild('optionsStart') optionsStart: ElementRef;
  leftMsg: string;
  rightMsg: string;
  initdata = [];
  constructor(private identityService: AuthService, private raceApi: RacesService, private actv: ActivatedRoute, private notify: NotifiqService, private route: Router) {
    this.raceHash = this.actv.snapshot.paramMap.get('id');
    this.startsAt = Number(this.actv.snapshot.paramMap.get('starts'));
  }

  ngOnInit() {
    this.startsInSecs = this.getWhenStarts();
    this.whenStarts();
    this.getBinaryPlayers();
    this.getMyDriver();
    this.initPopSock();

    this.initCcxtTicker();
    this.balance = this.identityService.getBalance().game_wallet_ioi;
    this.getBinaryHistory();
    this.subscribeToStream();
  

  }

  ngOnDestroy() {
    if (this.ccxtInterval) {
      clearInterval(this.ccxtInterval)
    }
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
  }

  subscribeToStream() {
    this.chartSubscription = this.chartStream.subscribe(datax => {
      if (datax.value && this.raceEnded === false) {

        const dateF = new Date(datax.time).toLocaleTimeString();
        this.chartTemp = {
          value: datax.value,
          time: datax.time,
          type: datax.type
        }
        this.updateChart();
      }
    });
    setTimeout(() => {
      this.initChartConfig();
    }, 5000);
  }

  updateChart() {

    if (this.chartTemp.value && this.chart) {
      const tempIndex = this.chart.data.labels.indexOf(this.chartTemp.time);
      let retypedindex: number;
      retypedindex = tempIndex;
      const isOnChart = this.chart.data.datasets[0].pointStyle[retypedindex] === 'circle';
      if (this.chart.data.labels.includes(this.chartTemp.time) && this.chartTemp.type !== 'circle') {
        if (isOnChart) {
          this.chart.data.datasets[0].data[tempIndex] = this.chartTemp.value;
          this.chart.data.datasets[0].pointStyle[tempIndex] = null;
          this.chart.data.datasets[0].pointStyle[tempIndex] = this.chartTemp.type;


          //this.chart.data.labels[tempIndex] = this.chartTemp.time;
        } else {
          const tempData = [];
          tempData.push(...this.chart.data.datasets[0].data);
          const tempPoint = [];
          tempPoint.push(...this.chart.data.datasets[0].pointStyle);
          const tempLabel = [];
          tempLabel.push(...this.chart.data.labels);


          const preformatTime = new Date(this.chartTemp.time).toLocaleTimeString();
          tempData.splice(tempIndex + 1, 0, this.chartTemp.value);
          tempPoint.splice(tempIndex + 1, 0, this.chartTemp.type);
          tempLabel.splice(tempIndex + 1, 0, preformatTime);


          this.chart.data.datasets[0].data = tempData;
          this.chart.data.datasets[0].pointStyle = tempPoint;
          this.chart.data.labels = tempLabel;



          if (this.chart.data.datasets[0].data.length > 50) {
            this.chart.data.datasets[0].data.shift();
            this.chart.data.datasets[0].pointStyle.shift();
            this.chart.data.labels.shift();
          }
          this.pushing = true;
          setTimeout(() => {
            this.pushing = false;
          }, 700);

          this.chart.update();
        }
      } else {
        this.addToChart();
      }
    }

  }

  addToChart() {
    this.chart.data.datasets[0].data.push(this.chartTemp.value);
    this.chart.data.datasets[0].pointStyle.push(this.chartTemp.type);
    const preformatTime = new Date(this.chartTemp.time).toLocaleTimeString();
    this.chart.data.labels.push(preformatTime);

    if (this.chart.data.datasets[0].data.length > 50) {
      this.chart.data.datasets[0].data.shift();
      this.chart.data.datasets[0].pointStyle.shift();
      this.chart.data.labels.shift();
    }
    if (this.chartTemp.type !== 'circle') {
      this.pushing = true;
      setTimeout(() => {
        this.pushing = false;
      }, 1000);
    }

    this.chart.update();
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
          //this.optWaiting = 10;
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
    let _that = this;
    setTimeout(() => {
      this.chart = new Chart('canvas', this.config);
      this.fillInitData();
      //this.hackChart();
      //this.config.options.scales.x.onRefresh = this.onRefresh();
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
              reverse: false,
              stepSize: 5,
              steps: 10,
              stepValue: 5,
              max: 100
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
        },
        bands: {
          yValue: this.currentValue, //randomScalingFactor(),
          baseColorGradientColor: [
            'rgb(255, 100, 100)'
          ],
          bandLine: {
            stroke: 2,
            colour: 'rgba(100, 100, 255, 1)',
            type: 'solid',
          }
        }
      }
    };
  }


  add(timeV: number, valV: number) {
    if (this.pushing === false) {
      const tdate = new Date(timeV);
      const vall = 1000 * Math.floor(timeV / 1000);
      this.currentValue = valV;

      const obj = {
        value: valV,
        type: 'circle',
        time: vall
      };

      this.chartStream.next(obj);
    }
  }

  // websocket to chart section


  addFromPlayer(timeV: any, valV: number, long?: boolean, me?: boolean) {
    const pl = timeV * 1000;
    let imag = new Image();
    if (me === false) {
      long === true ? imag.src = '/assets/base/images/binary/oponent-long.png' : imag.src = '/assets/base/images/binary/oponent-short.png';
    }
    if (me === true) {
      long === true ? imag.src = '/assets/base/images/binary/long.png' : imag.src = '/assets/base/images/binary/short.png';
    }

    const obj = {
      value: valV,
      type: imag,
      time: pl
    };

    this.chartStream.next(obj);
    if (me === true) {
      this.optWaiting = 10;
      this.playSound('optionPlaced');
      this.convertToHuman(true, 'Placed!');
    } else {
      this.playSound('oponentOptionPlaced');
      this.convertToHuman(false, 'Placed!');
    }
  }

  placeLineToChart(obj) {
    let imag = new Image();
    imag.src = '/assets/base/images/binary/green.png';
    

    this.chartStream.next(obj);
    
  }



  addFromDecision(lplayer: boolean, shot: boolean, timeV: number, valV: number) {
    const imag = new Image();
    const rightdate = timeV * 1000;

    if (lplayer === true) {
      shot === false ? imag.src = '/assets/base/images/binary/bad.png' : imag.src = '/assets/base/images/binary/good.png';
    }
    if (lplayer === false) {
      shot === false ? imag.src = '/assets/base/images/binary/oponent-bad.png' : imag.src = '/assets/base/images/binary/oponent-good.png';
    }
    const obj = {
      value: valV,
      type: imag,
      time: rightdate
    };

    this.chartStream.next(obj);

    if (lplayer === true) {
      if (shot === false) {
        this.playSound('optionLoose');
        this.convertToHuman(true, 'Ehm..');
      }
      else {
        this.playSound('optionWin');
        this.convertToHuman(true, 'Great!');
      }
    }
    if (lplayer === false) {
      if (shot === false) {
        this.playSound('optionLooseOponent')
        this.convertToHuman(false, 'Loosed');
      } else {
        this.playSound('optionWinOponent');
        this.convertToHuman(false, '');
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
      const opt = JSON.parse(data);
      _this.onWinners(opt);
    });

    popsock.on("score", function (data) {
      const opt = JSON.parse(data);
      _this.onScore(opt);
    });

    popsock.on("history", function (data) {
      const opt = JSON.parse(data);
    });

    popsock.on("message", function (data) {
      _this.avatarMsg(data);
    });

    popsock.on("cancel", function (data) {
      const opt = JSON.parse(data);
      _this.onCancel(opt);
    });
  }

  onOption(data?: any) {
    const opt = data;
    opt.uh === this.myId ? this.addFromPlayer(opt.ts, opt.ap, opt.long, true) : this.addFromPlayer(opt.ts, opt.ap, opt.long, false);
  }

  onCancel(data?: any) {
    const opt = data;
    this.notify.success('', data.reason);
    setTimeout(() => {
      this.route.navigate(['/race/binary-trade/' + data.model.versus_hash + '/' + data.model.start_at.toString()]);
     }, 3000);
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
    if (this.meWon === false) {
      this.unityEnabled === false;
      this.playSound('meLoose');
      this.convertToHuman(true, 'You loose');
    } else {
      this.playSound('meWin');
      this.convertToHuman(true, 'You won!!!');
    }
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
    this.playSound('action');
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

  hackChart() {
    this.chart.data.datasets[0].data.push(0);
    this.chart.data.datasets[0].pointStyle.push('circle');
    this.chart.data.labels.push(Date.now());

    this.chart.data.datasets[0].data.shift();
    this.chart.data.datasets[0].pointStyle.shift();
    this.chart.data.labels.shift();

    setTimeout(() => { this.showChart = true; }, 100);
  }

  whenStarts() {
    const newwhen = this.getWhenStarts();
    this.startVal = newwhen;
    const fireSemaforx = (newwhen - 5) * 1000;

    setTimeout((
    ) => {
      this.launchSemafor();
    }, fireSemaforx);
  }

  launchSemafor() {
    this.semaforsVisible = true;
    this.semaforVal = 5;
      setTimeout(() => {

        this.semaforVal = 4;

      }, 1000);
      setTimeout(() => {

        this.semaforVal = 3;

      }, 2000);
      setTimeout(() => {

        this.semaforVal = 2;

      }, 3000);
      setTimeout(() => {

        this.semaforVal = 1;

      }, 4000);
      setTimeout(() => {

        this.semaforVal = 0;
        this.playSound('optionsStart');
      }, 5000);
      setTimeout(() => {

        this.semaforVal = -1;
        this.semaforsVisible = false
      }, 5100);
  }

  playSound(type: string) {
    if (type === 'optionPlaced') {
      this.optionPlaced.nativeElement.play();
    }
 
    if (type === 'oponentOptionPlaced') {
      this.oponentOptionPlaced.nativeElement.play();
    }
 
    if (type === 'optionWin') {
      this.optionWin.nativeElement.play();
    }
 
    if (type === 'optionWinOponent') {
      this.optionWinOponent.nativeElement.play();
    }
 
    if (type === 'optionLoose') {
      this.optionLoose.nativeElement.play();
    }
 
    if (type === 'optionLooseOponent') {
      this.optionLooseOponent.nativeElement.play();
    }
    if (type === 'meWin') {
      this.meWin.nativeElement.play();
    }
 
    if (type === 'meLoose') {
      this.meLoose.nativeElement.play();
    }

    if (type === 'optionsStart') {
      this.optionsStart.nativeElement.play();
    }
 
  }

  convertToHuman(lPlayer: boolean, msg: string) {
    if (lPlayer === true) {
      this.leftMsg = msg;
    } else {
      this.rightMsg = msg;
    }
  }

  getBinaryHistory() {
    this.raceApi.binaryHistory(50).subscribe(
      data => {
        this.initdata = data;
        
      }
    )
  }

  fillInitData() {
    for (let x = 0; x < this.initdata.length; x++) {
      this.add(this.initdata[x].ts * 1000, this.initdata[x].ap);
    }
  }

}

