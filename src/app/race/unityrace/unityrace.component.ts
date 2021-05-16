import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';

declare let UnityLoader: any;
declare let createUnityInstance: any;
declare let window: any;
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
    /*
    console.log(UnityLoader);
    this.gameInstance = UnityLoader.instantiate(
      'unityContainer',
      '/assets/game/build.json', {
      onProgress: (unityContainer: any, progres: any) => {
        console.log('jano');
        this.progress = progres;
        if (progres === 1) {
          this.initRace();
        }
      }
    });
*/
    console.log('junity here');
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "/assets/game/Build/IOI_Avatar.data",
      frameworkUrl: "/assets/game/Build/IOI_Avatar.framework.js",
      codeUrl: "/assets/game/Build/IOI_Avatar.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "IOI Corporation s.r.o",
      productName: "IOI_Avatar",
      productVersion: "0.1",
    }).then((unityInstance) => {
      window.unityInstance = unityInstance;
      this.gameInstance = unityInstance;
      this.gameInstance.SendMessage('JavascriptHook', 'SetAvatar', '1|6');
      this.gameInstance.SendMessage('JavascriptHook', 'SetAvatar', '2|5');
 
    });
  }

  initRace() {
    //this.runDetail();
  }



  hello() {
    this.gameInstance.SendMessage('JavascriptHook', 'SetAnimation', '1|1');
  }
  yo() {
    this.gameInstance.SendMessage('JavascriptHook', 'SetAnimation', '1|2|4');
  }
  good() {
    this.gameInstance.SendMessage('JavascriptHook', 'SetAnimation', '2|3');
  }



}
