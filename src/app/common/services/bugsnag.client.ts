/**
 * @Author: SCR� <technologies@scr.sk>
 * @Date: 22.09.2018 20:58
 */
import bugsnag from 'bugsnag-js';
import {environment} from '../../../environments/environment';

// This service initializes Bugsnag and makes it available to the root module. Below are examples of some possible configurations, but only the api apiKey is required to get started.

const bugsnagClient = bugsnag({
    // get your own api key at bugsnag.com
    apiKey: environment.bugsnag_api,

    // if you track deploys or use source maps, make sure to set the correct version.
    appVersion: '1',

    // Bugsnag can track the number of �sessions� that happen in your application, and calculate a crash rate for each release. This defaults to false.
    autoCaptureSessions: false,

    // defines the release stage for all events that occur in this app.
    releaseStage: environment.stage || 'development',

    //  defines which release stages bugsnag should report. e.g. ignore staging errors.
    notifyReleaseStages: ['development', 'staging', 'present', 'production'],

    // because this is a demo app, below extends the default of 10 notifications per pageload. click away!
    maxEvents: 25,

});

// See our documentation for futher options and examples https://docs.bugsnag.com/
export default bugsnagClient;
