import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ioi.game',
  appName: 'Trade Race Manager',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      'android-minSdkVersion': '29',
      'android-targetSdkVersion': '29',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '0',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '0',
      APP_ID: '494347361216551',
      Orientation: 'landscape',
      Fullscreen: 'true',
      WKWebViewOnly: 'true',
      DisallowOverscroll: 'true',
      iosScheme: 'httpsionic'
    }
  }
};

export default config;
