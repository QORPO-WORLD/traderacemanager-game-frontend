"use strict";

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  //const headers = request.headers;

  const staticPaths = [
    "/car/buy-cars",
    "/leaderboard/players",
    "/leaderboard/players-winners",
    "/leaderboard/teams",
    "/other/affilate",
    "/other/rewards",
    "/other/deposit",
    "/other/referral-players",
    "/other/cockpit",
    "/other/healme",
    "/player/profile",
    "/race/all-races",
    "/race/live-races",
    "/race/race-detail",
    "/race/race-join",
    "/race/watch-race",
    "/teams/join-teams",
    "/user/sign-up",
    "/user/sign-in",
    "/user/forgot-password",
    "/user/reset-password",
    "/user/terms-of-use",
    "/user/privacy-policy",
    "/user/email-created",
    "/user/user-verify",
    "/user/home",
    "/your-races/transactions",
    "/your-races/my-races",
    "/player/setup-auth",
    "/player/disable-auth",
    "/car/garage",
    "/car/garage/my-cars",
    "/other/tasks",
    "/user/home",
    "/race/start-race",
    "/teams/my-team",
    "/other/nitro-wallet",
    "/user/sign-up-campaign2020a",
    "/car/favourite-cars",
    "/race/watch-race-3min/demo-preview-race",
    "/user/verify-code",
    "/user/verify-authenticator",
    "/other/wallet-control",
    "/teams/leaderboard",
    "/teams/owners-managers",
    "/race/race-type",
    "/car/nft-market",
    "/user/shop",
    "/nft-detail",
    "/your-races/transactions/my-races",
    "/profile/my-profile",
    "/user/credit-system",
    "/user/terms-conditions",
    "/user/competition",
    "/race/binary-fuel",
    "/other/deposit-nft",
    "/other/transfer",
    "/other/withdraw",
    "/user/home",
    "/race/race-selection",
    "/user/bundles",
    "/user/bundle-detail",
    "/user/affiliate",
    "/user/password-reset",
    "/user/how-to",
    "/teams/best-racers",
    "/user/tesla",
    "/maintenance",
    "/other/maintenance",
  ];

  if (
    staticPaths.includes(request.uri) || // check direct match in staticPaths
    request.uri.match(/\/car\/fuel-car\/.+/) || // '/car/fuel-car/:id'
    request.uri.match(/\/race\/watch-race-3min\/.+/) || // '/race/watch-race-3min/:id'
    request.uri.match(/\/race\/watch-race-24hod\/.+/) || // '/race/watch-race-24hod/:id'
    request.uri.match(/\/user\/referral\/.+/) || // '/user/referral/:id'
    request.uri.match(/\/user\/activation\/.+/) || // '/user/activation/:id/:hash'
    request.uri.match(/\/other\/confirm\/.+/) ||
    request.uri.match(/\/race\/all-races\?raceType=.+/) ||
    request.uri.match(/\/race\/watch-multiple-races.+/) ||
    request.uri.match(/\/race\/binary-trade\/.+\/(\d+)/) ///race/binary-trade/:hash/:timestamp
  ) {
    request.uri = "/index.html";
    callback(null, request);
    return;
  }

  // do not rewrite others requests
  callback(null, request);
};
