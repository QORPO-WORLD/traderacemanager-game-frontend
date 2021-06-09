
import { NotifyService } from './../../../common/services/notify.service';
import { RacesService } from 'src/app/api/services';
import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/user/services/auth.service';
import { Subscription, Subject } from 'rxjs';
declare let ccxt: any;

let popsock = (window as any).kocksock;
import io from "socket.io-client"
//import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import 'chartjs-plugin-streaming';
import 'chartjs-plugin-datalabels';
import { BandsPlugin } from './Chart.Bands.js';
declare let ChartDataSets: any;
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
  unityEnabled = false;
  chartEnabled = true;
  semaforsVisible = true;
  balance: any;
  startsAt: number;
  finishingAt: any;
  myDriverBalances: any;
  startsInSecs: number;
  chartStream: Subject<any> = new Subject();;
  chartSubscription: Subscription;
  pushing = false;
  animateMyWinnerAvatars = false;
  animateRivalWinnerAvatars = false;
  affiliate: any;
  semaforVal = 6;
  chartTemp: any;
  showChart = true;
  startVal: number;

  racers: Array<any> = [
    {
      id: 0,
      name: 'Rookie',
      image: 'rookie-basic',
      gif: "",
      sum: 0,
      pks: []
    },
    {
      id: 1,
      name: 'Axle',
      image: 'white-trm',
      gif: "white-trm-animation",
      sum: 0,
      pks: []
    },
    {
      id: 2,
      name: 'Flash',
      image: 'red-trm',
      gif: "red-trm-animation",
      sum: 0,
      pks: []
    },
    {
      id: 3,
      name: 'Octane',
      image: 'blue-trm',
      gif: "blue-trm-animation",
      sum: 0,
      pks: []
    },
    {
      id: 4,
      name: 'Punisher',
      image: 'black-trm',
      gif: "black-trm-animation",
      sum: 0,
      pks: []
    },
    {
      id: 5,
      name: 'Lady Rich',
      image: 'lady-rich',
      gif: "lady-rich-animation",
      sum: 0,
      pks: []
    },
    {
      id: 6,
      name: 'Rich Jr.',
      image: 'bad-boy',
      gif: "bad-boy-animation",
      sum: 0,
      pks: []
    },
    {
      id: 7,
      name: 'Mrs. Rich',
      image: 'mrs-rich',
      gif: "mrs-rich-animation",
      sum: 0,
      pks: []
    },
    {
      id: 8,
      name: 'Mr. Rich',
      image: 'mr-rich',
      gif: "mr-rich-animation",
      sum: 0,
      pks: []
    }
  ];
  @ViewChild('optionPlaced') optionPlaced: ElementRef;
  @ViewChild('oponentOptionPlaced') oponentOptionPlaced: ElementRef;
  @ViewChild('optionWin') optionWin: ElementRef;
  @ViewChild('optionWinOponent') optionWinOponent: ElementRef;
  @ViewChild('optionLoose') optionLoose: ElementRef;
  @ViewChild('optionLooseOponent') optionLooseOponent: ElementRef;
  @ViewChild('meLoose') meLoose: ElementRef;
  @ViewChild('meWin') meWin: ElementRef;
  @ViewChild('optionsStart') optionsStart: ElementRef;
  leftMsgSmall: string;
  rightMsgSmall: string;
  leftMsgBig: string;
  rightMsgBig: string;
  animatingRmsg = false;
  animatingLmsg = false;
  initdata = [];
  endVal: number;
  canBet = false;
  raceStarted = false;
  binanceT: any;
  colorUp = false;
  lastprice: number;
  addedCommon = 0;
  emojiLeft: string;
  emojiRight: string;
  emojiLeftCounter = 0;
  emojiRightCounter = 0;
  pageOpen = true;
  cantPlaceBetAnymore = false;
  leftScore = 0;
  rightScore = 0;
  statusObservable: Subscription;
  constructor(private identityService: AuthService, private raceApi: RacesService, private actv: ActivatedRoute, private notify: NotifyService, private route: Router) {
    this.raceHash = this.actv.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.startsAt = Number(this.actv.snapshot.paramMap.get('starts'));
    this.startsInSecs = this.getWhenStarts();
    setTimeout(() => {
      this.raceStarted = true;
      const newwhen = this.getWhenStarts();
      this.endVal = newwhen + 60;
    }, this.startsInSecs * 1000)
    this.whenStarts();
    this.getBinaryPlayers();
    this.getCryptoStats();
    this.getMyLevel();
    this.getMyDriver();
    this.initPopSock();
    this.initCcxtTicker();
    this.balance = this.identityService.getBalance().game_wallet_ioi;
    this.getBinaryHistory();
    this.subscribeToStream();

    setTimeout(() => {
      if (this.pageOpen === true) {
        // this.unityEnabled = true;
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.ccxtInterval) {
      clearInterval(this.ccxtInterval)
    }
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
    if (this.statusObservable) {
      this.statusObservable.unsubscribe();
    }
    this.binanceT = null;
    this.chartEnabled === false;
    this.pageOpen = false;
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
    this.currentValue

    this.colorUp === true ? this.config.options.bands.bandLine.colour = 'rgb(0, 212, 129)' : this.config.options.bands.bandLine.colour = 'rgb(254, 23, 63)';
    this.config.options.bands.yValue = this.currentValue;
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
      this.canBet = false;
      this.gameObserver = this.raceApi.binaryOption({
        "race_hash": this.raceHash,
        "long": this.long
      }).subscribe(
        data => {
          this.convertToHuman(true, 'Placing', 'option');
          //this.optWaiting = 10;
          if (data.next_bet === 0) {
            this.canBet = true;
            setTimeout(() => {
              this.canBet = true;
              console.log('now can bet');
            }, 10000);
          } else {
            const x = Date.now();
            const y = (data.next_bet * 1000) - x;
            setTimeout(() => {
              this.canBet = true;
            }, y);
          }
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
      Chart.pluginService.register(new BandsPlugin());
      
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
            },
            ticks: {
              fontColor: "#868686",
              reverse: false,
              stepSize: 5

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
              stepSize: 5

            }
          }]
        },
        bands: {
          yValue: this.currentValue,
          baseColorGradientColor: [

          ],
          bandLine: {
            stroke: 1,
            colour: 'rgb(0, 212, 129)',
            type: 'dashed',
          }
        },
        tooltips: {
          name: 'jano',
          enabled: true,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          
        }
      }
    };

  }


  add(timeV: number, valV: number) {
    if (this.pushing === false) {
      const vall = 1000 * Math.floor(timeV / 1000);

      valV > this.currentValue ? this.colorUp = true : this.colorUp = false;
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
      console.log(opt);
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
      const opt = JSON.parse(data);
      _this.avatarMsg(opt);
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
    this.notify.error(data.reason);
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
      this.convertToHuman(true, 'loose', 'You');
      this.animateRivalWinnerAvatars = true;
    } else {
      this.playSound('meWin');
      this.convertToHuman(true, 'won!!!', 'You');
      this.animateMyWinnerAvatars = true;
    }
    this.raceEnded = true;
  }

  onScore(data?: any) {
    const opt = data;
    if (opt.uh === this.myId) {
      this.myShots = data.p;
      this.roileft = data.r;
      this.leftScore = this.calcScore(data.p);
    } else {
      this.oponentShots = data.p;
      this.roiright = data.r;
      this.rightScore = this.calcScore(data.p);
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

  avatarMsg(msg: any,) {
      if (msg.reaction === 2) {
        this.resolveEmoji('happy', msg.user_hash !== this.myId);
      }
      if (msg.reaction === 3) {
        this.resolveEmoji('sad', msg.user_hash !== this.myId);
      }
      if (msg.reaction === 4) {
        this.resolveEmoji('brutal', msg.user_hash !== this.myId);
      }
    //}
    this.raceComp.yo(msg);
  }

  sendSockAvatarMsg(msg: any) {
    this.locked = true;
    this.convertToHuman(true, 'Reaction', 'sent');
    popsock.emit("client_triggered_emit",
      {
        "event": "message",
        "user": this.myId,
        "room": 'vs_' + this.raceHash,
        "data": JSON.stringify(msg)
      });
    setTimeout(() => {
      this.locked = false;
    }, 5000);
  }


  resolveAvatars(data: Array<{
    user_id: string;
    user_hash: string;
    user_nickname: string;
  }>) {
    this.myId = this.identityService.getDriverMe().id;
    for (let x = 0; x < data.length; x++) {
      if (data[x].user_hash === this.myId) {
        console.log(data[x]);
        this.mePlaying = true;
        this.myPlayer = data[x];
      }
    }
    if (this.mePlaying === true) {
      this.players.push(this.myPlayer);
      for (let x = 0; x < data.length; x++) {
        if (data[x].user_hash !== this.myId) {
          this.players.push(data[x]);
        }
      }
      if (this.startsInSecs > 5) {
        setTimeout(() => {
          this.notify.error('You can place 1 option before the game will start.');
          this.canBet = true;
        }, 2000);
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
    this.binanceT = new ccxt.binance({ enableRateLimit, options: {} });

    if (this.binanceT.has['watchTicker']) {

      while (this.chartEnabled === true && this.binanceT !== null) {
        try {
          const ticker = await this.binanceT.watchTicker('BTC/USDT', {});
          this.add(ticker.timestamp, ticker.last)
        } catch (e) {
          this.chartEnabled = false;
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
    const then: any = this.startsAt * 1000;
    const now: any = DateTime.utc();
    const diffTime = Math.abs((then - now.ts) / 1000);

    return Math.round(diffTime);
  }

  whenStarts() {
    const newwhen = this.getWhenStarts();

    this.startVal = newwhen;
    //this.endVal = newwhen + 60;
    console.log(this.startVal);
    const fireSemaforx = (newwhen - 5) * 1000;
    if (fireSemaforx > 0) {
      setTimeout((
      ) => {
        this.launchSemafor();
      }, fireSemaforx);
    }
    const fireSemafory = (newwhen + 50) * 1000;
    if (fireSemaforx > 0) {
      setTimeout((
      ) => {
        this.cantPlaceBetAnymore = true;
      }, fireSemafory);
    } 
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

  convertToHuman(lPlayer: boolean, msgBig: string, msgSmall?: string) {
    if (lPlayer === true && this.animatingLmsg === false) {
      this.leftMsgSmall = msgSmall;
      this.leftMsgBig = msgBig;
      this.animatingLmsg = true;
      setTimeout(() => {
        this.leftMsgSmall = '';
        this.leftMsgBig = '';
        this.animatingLmsg = false;
      }, 3000);
    } else if (this.animatingRmsg === false && lPlayer === false) {
      this.rightMsgSmall = msgSmall;
      this.rightMsgBig = msgBig;
      this.animatingRmsg = true;
      setTimeout(() => {
        this.rightMsgSmall = '';
        this.rightMsgBig = '';
        this.animatingRmsg = false;
      }, 3000);
    }
  }

  getBinaryHistory() {
    this.raceApi.binaryHistory(50).subscribe(
      data => {
        this.initdata = data;
        this.fillInitData();
      }
    )
  }

  fillInitData() {
    for (let x = 0; x < this.initdata.length; x++) {
      this.add(this.initdata[x].ts * 1000, this.initdata[x].ap);
    }
    this.getStatus();
  }

  getMyLevel() {
    this.affiliate = this.identityService.getStorageAff();
  }

  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriverBalances = data;
  }

  resolveEmoji(type: string, lPlayer: boolean) {
    if (lPlayer === true) {
      this.emojiLeft = type;
      for (let x = 1; x < 20; x++) {
        setTimeout(() => {
          this.emojiLeftCounter++;
        },
          x * 50);
      }
  
      setTimeout(() => {
        this.emojiLeft = null;
        this.emojiLeftCounter = 0;
      }, 3000);
    } else {
      this.emojiRight = type;
      for (let x = 1; x < 20; x++) {
        setTimeout(() => {
          this.emojiRightCounter++;
        },
          x * 50);
      }
  
      setTimeout(() => {
        this.emojiRight = null;
        this.emojiRightCounter = 0;
      }, 3000);
    }
    
  }

  calcScore(data: Array<any>) {
    let tScore = 0;
    for (let x = 0; x < data.length; x++) {
      tScore = tScore + data[x];
    }

    return tScore;
  }

  getStatus() {
    this.statusObservable = this.raceApi.binaryStatus(this.raceHash).subscribe(data => {
      if (data.options.length > 0) {
        for (let x = 0; x < data.options.length; x++) {
          this.onOption(data.options[x]);
        }
      }
      if (data.options_closed.length > 0) {
        for (let x = 0; x < data.options_closed.length; x++) {
          this.onOptionClosed(data.options_closed[x]);
        }
      }
      if (data.score.length > 0) {
        for (let x = 0; x < data.score.length; x++) {
          this.onScore(data.score[x]);
        }
      }
    });
  }
  


}

