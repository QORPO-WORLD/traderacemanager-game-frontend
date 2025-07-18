import {
  Experience,
  ExperienceService,
} from "src/app/common/services/experience.service";
import { RacesService } from "../../../api/services/races.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { NextRaceV2 } from "src/app/api/models";
import { DriversService, TeamsService } from "src/app/api/services";
import { AuthService } from "src/app/user/services/auth.service";
import { Router } from "@angular/router";
import { throwIfEmpty } from "rxjs/operators";
@Component({
  selector: "app-all-races",
  templateUrl: "./all-races.component.html",
  styleUrls: ["./all-races.component.scss"],
})
export class AllRacesComponent implements OnInit {
  @ViewChild("rulesModal") rulesModal: any;
  accountInfo: any;
  updateFavCoinsObserver: Subscription;
  favObserver: Subscription;
  howToInterval: any;
  howToStep = 1;
  fastRaceIndex = 1;
  animation = 0;
  contentAnimation = 0;
  content = 1;
  timeoutPrev: any;
  timeoutNext: any;
  title = "ALL RACES";
  raceType = "trx";
  raceObserver: Subscription;
  tsubscribe: Subscription;
  selRaceType: string;
  currentExpLevel: number;
  myDriverBalances: any;
  signedIntoRace = false;
  newNextData: NextRaceV2[];
  fastEnabled = false;
  myIoiBalance = 0;
  myTrxBalance = 0;
  tickets = 0;
  myTeamStats: any;
  myTeamName: any;
  freeRace: any;
  fastRaces: any;
  premiumTournament: any;
  premiumTeamTournament: any;
  specialTournament: any;
  myFavRaces = [];
  baseFavRaces = [
    { type: "car_race_short_0", fav: false },
    { type: "car_race_portfolio_0", fav: false },
    { type: "premium_tournament_0", fav: false },
    {
      type: "premium_tournament_team_0",
      fav: false,
    },
    // { type: "tesla_tournament_0", fav: false },
  ];

  tutorialStep = 1;
  introModal = false;
  firstLogin = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private experience: ExperienceService,
    protected api: RacesService,
    private dapi: DriversService,
    private identityService: AuthService,
    private tapi: TeamsService
  ) {
    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
  }

  ngOnInit(): void {
    this.accountInfo = this.identityService.getDriverMe();
    this.getRaceType();
    this.getAllRaces();
    this.fastFuelEnabled();
    this.getMydriverBalances();
    this.getmyFavRaces();
    this.getMyTeam();
    this.toggleContent(1);
    this.launchTutorial();
  }

  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeamName = data.team;
    this.getTeams();
  }

  getRaceType() {
    this.raceObserver = this.route.queryParams.subscribe((params) => {
      this.raceType = params["raceType"];
    });
  }

  getAllRaces() {
    this.raceObserver = this.api.racesNextV2List().subscribe((data) => {
      const nedata: any = data;

      let free = nedata.filter((word) => word.race_type === "car_race_short");
      this.freeRace = free[0];
      this.fastRaces = nedata.filter(
        (word) => word.race_type === "car_race_portfolio"
      );
      let premium = nedata.filter(
        (word) => word.race_type === "premium_tournament"
      );
      this.premiumTournament = premium[0];
      let premiumTeam = nedata.filter(
        (word) => word.race_type === "premium_tournament_team"
      );
      this.premiumTeamTournament = premiumTeam[0];
      let special = nedata.filter(
        (word) => word.race_type === "tesla_tournament"
      );
      this.specialTournament = special[0];
      this.newNextData = nedata;
    });
  }

  fastFuelEnabled() {
    this.dapi.driversFavFuelList().subscribe((data) => {
      const datax: any = data;
      if (datax.length > 0) {
        this.fastEnabled = true;
      }
    });
  }

  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
    this.myIoiBalance =
      this.myDriverBalances.game_wallet_ioi +
      this.myDriverBalances.stake_wallet_ioi +
      this.myDriverBalances.nitro_wallet_ioi;
    const datax = this.identityService.getStorageIdentity();
    this.tickets = datax.tournament_tickets;
  }

  getTeams() {
    this.tsubscribe = this.tapi.teamsList().subscribe((data) => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });
      this.myTeamStats = newdata.find((x) => x.name === this.myTeamName);
    });
  }
  back() {
    this.animation = 1;
    this.timeoutPrev = setTimeout(() => {
      this.router.navigate(["/race/race-selection"]);
      this.timeoutReset();
    }, 300);
  }
  switchContent(contentNumber: number) {
    this.clearIntervalHowTo();
    this.toggleContent(1);
    this.timeoutReset();
    if (this.content !== contentNumber) {
      this.contentAnimation = 1;
      this.timeoutPrev = setTimeout(() => {
        this.contentAnimation = 2;
        this.content = contentNumber;
        this.timeoutReset();
      }, 300);
    }
  }
  timeoutReset() {
    clearTimeout(this.timeoutNext);
    clearTimeout(this.timeoutPrev);
  }

  toggleContent(contentId: number) {
    this.clearIntervalHowTo();

    this.howToStep = contentId;
    this.howToInterval = window.setInterval(() => {
      if (this.howToStep === 5) {
        this.howToStep = 1;
      } else {
        this.howToStep++;
      }
    }, 4000);
  }
  clearIntervalHowTo() {
    clearInterval(this.howToInterval);
  }

  openRulesModal() {
    this.rulesModal.switchModal();
  }

  updateFavRaces() {
    const data: any = [];
    for (let y = 0; y < this.baseFavRaces.length; y++) {
      if (this.baseFavRaces[y].fav === true) {
        data.push(this.baseFavRaces[y].type);
      }
    }

    this.updateFavCoinsObserver = this.dapi
      .driversFavRacesUpdate({ race_identifiers: data })
      .subscribe((datax) => {
        this.getmyFavRaces();
      });
  }

  getmyFavRaces() {
    this.favObserver = this.dapi.driversFavRacesList().subscribe((data) => {
      const nn: any = data;
      this.myFavRaces = nn;
      this.resortFavRaces();
    });
  }

  resortFavRaces() {
    for (let x = 0; x < this.myFavRaces.length; x++) {
      for (let y = 0; y < this.baseFavRaces.length; y++) {
        if (this.baseFavRaces[y].type === this.myFavRaces[x]) {
          this.baseFavRaces[y].fav = true;
        }
      }
    }
  }

  onTimerComplete() {
    setTimeout(() => {
      this.getAllRaces();
    }, 100);
  }

  closeModal(e: any) {
    this.selRaceType = null;
  }

  launchTutorial() {
    const data = this.identityService.getStorageIdentity();
    const datax: any = data;
    this.firstLogin = data.is_in_tutorial;
    this.tickets = datax.tournament_tickets;
    if (this.firstLogin === true && window.innerWidth > 1024) {
      this.introModal = true;
    } else {
      this.tutorialStep = -1;
    }
  }

  skipModal() {
    this.firstLogin = false;
    this.introModal = false;
    this.dapi.driversTutorialPartialUpdate(false).subscribe((data) => {
      this.identityService.meUpdate();
    });
  }

  nextTutorialStep() {
    this.tutorialStep++;
  }
  openLink(url: string) {
    window.open(url, "_blank").focus();
  }
}
