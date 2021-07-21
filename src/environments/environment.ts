// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  stage: "development",
  hmr: false,
  api_url: "https://dev-api.traderacemanager.com/",
  production: false,
  encryptPassphrase: "ioi-game-cbucrebnu778i37943",
  bugsnag_api: "5e742571214fc41347ff9270518937de",
  title_suffix: "IOI-GAME",
  ctaEmail: "mailto",
  ctaEmailShareTeamProfile: "mailto:",
  ctaEmailHelp: "mailto:",
  pusher: {
    app_id: "992952",
    key: "a55cc3f353faecb15b36",
    secret: "40168754f0c9d5daea87",
    cluster: "eu",
  },
  cache: {
    enabled: true,
    debug: false,
    max_age: 30,
  },
};
