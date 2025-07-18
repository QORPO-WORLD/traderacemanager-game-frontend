import {
  Experience,
  ExperienceService,
} from "src/app/common/services/experience.service";
import { RacesService } from "../../../api/services/races.service";

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { NextRaceV2 } from "src/app/api/models";
import { DriversService, TeamsService } from "src/app/api/services";
import { AuthService } from "src/app/user/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-race-selection",
  templateUrl: "./race-selection.component.html",
  styleUrls: ["./race-selection.component.scss"],
})
export class RaceSelectionComponent implements OnInit {
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
  animation = 0;
  timeoutPrev: any;
  timeoutNext: any;
  myTeamStats: any;
  myTeamName: any;

  tutorialStep = 1;
  introModal = false;
  firstLogin = false;

  constructor(
    private route: ActivatedRoute,
    private experience: ExperienceService,
    protected api: RacesService,
    private dapi: DriversService,
    private identityService: AuthService,
    private tapi: TeamsService,
    public router: Router
  ) {
    experience.load((data: Experience) => {
      this.currentExpLevel = data.getCurrentExpLevel();
    });
  }

  ngOnInit(): void {
    this.getRaceType();
    this.fastFuelEnabled();
    this.getMydriverBalances();
    this.getMyTeam();
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
  next() {
    this.animation = 2;
    this.timeoutPrev = setTimeout(() => {
      this.router.navigate(["/race/all-races"]);
      this.timeoutReset();
    }, 300);
  }
  back() {
    this.animation = 1;
    this.timeoutPrev = setTimeout(() => {
      this.router.navigate(["/race/start-race"]);
      this.timeoutReset();
    }, 300);
  }
  timeoutReset() {
    clearTimeout(this.timeoutNext);
    clearTimeout(this.timeoutPrev);
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
    if (this.tutorialStep === 2) {
      this.router.navigate(["/race/all-races"]);
    }
    this.tutorialStep++;
  }

}
