import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
;
declare var UnityLoader: any;
@Component({
  selector: 'app-unityrace',
  templateUrl: './unityrace.component.html',
  styleUrls: ['./unityrace.component.scss'],
})
export class UnityraceComponent implements OnInit, AfterViewInit, OnDestroy {

  unityInstance: any;

  uParam = {
    "companyName": "ioi-game",
    "productName": "unity-test",
    "productVersion": "0.2",
    "dataUrl": "Builds.data.unityweb",
    "wasmCodeUrl": "Builds.wasm.code.unityweb",
    "wasmFrameworkUrl": "Builds.wasm.framework.unityweb",
    "graphicsAPI": ["WebGL 2.0", "WebGL 1.0"],
    "webglContextAttributes": { "preserveDrawingBuffer": false },
    "splashScreenStyle": "Dark",
    "backgroundColor": "#231F20",
    "cacheControl": { "default": "must-revalidate" },
    "developmentBuild": false,
    "multithreading": false,
    "unityVersion": "2019.4.15f1"
  }
  gameInstance: any;
  progress = 0;
  isReady = false;
  @Input() rDetail: any;
  @Input() rStats: any;
  fakeDetail: any;
  fakeStats: any;
  timeoutBool = false;
  gameInterval: any;
  gameCheckInterval: any;

  constructor() { }

  ngOnInit() {

    this.fakeDetail = this.rDetail;
    this.fakeStats = this.rStats;
    this.resolveAction();
  }

  ngOnDestroy() {
    if (this.gameInstance) {
      this.gameInstance.Quit(() => {
        console.log("done!");
      });
      this.gameInstance = null;
    }
    clearInterval(this.gameCheckInterval);
    clearInterval(this.gameInterval);
  }

  ngAfterViewInit() {
    this.gameInstance = UnityLoader.instantiate(
      'unityContainer',
      '/assets/game2/Build/Builds.json', {
      onProgress: (unityContainer: any, progres: any) => {
        this.progress = progres;
        if (progres === 1) {
          this.initRace();
        }
      }
    });


  }

  initRace() {

    this.gameInterval = setInterval((
    ) => {
      this.checkData();
    }, 900);
    this.runDetail();
    setTimeout(() => {
      this.progress = 2;
    }, 10);
  }

  checkData() {
    console.log(this.rStats.race_progress);
    console.log(this.fakeStats.race_progress);
    if (this.rDetail.starts_in_seconds !== this.fakeDetail.starts_in_seconds || this.fakeStats.race_progress !== this.rStats.race_progress) {
      this.fakeDetail = this.rDetail;
      if (this.rStats) {
        this.fakeStats = this.rStats;
      }

      this.resolveAction();
    }
  }

  runStats() {
    console.log('called statsto unity with race progress');
    console.log(this.rStats.race_progress);
    this.gameInstance.SendMessage('JsonHook', 'RunRaceStats', JSON.stringify(this.rStats));
  }

  runDetail() {
    this.gameInstance.SendMessage('JsonHook', 'RunRaceDetails', JSON.stringify(this.rDetail));
  }

  resolveAction() {

    if (this.rStats.race_progress > 0) {
      this.runStats();
    } else {
      this.runDetail()
    }

    return;
    if (this.rDetail.starts_in_seconds > 5) {
      this.runDetail();
      if (this.timeoutBool === false) {
        this.timeoutBool = true;
        setTimeout(() => {
          this.runStats();
        }, this.rDetail.starts_in_seconds * 1000);
      }
    } else {
      this.runStats()
    }
  }


}
