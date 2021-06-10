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
import { throwIfEmpty } from "rxjs/operators";
@Component({
  selector: "app-all-races",
  templateUrl: "./all-races.component.html",
  styleUrls: ["./all-races.component.scss"],
})
export class AllRacesComponent implements OnInit {
  howToInterval: any;
  howToStep = 1;
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
  astart: any;
  bstart: any;
  cstart: any;
  dstart: any;
  estart: any;
  fstart: any;
  gstart: any;
  hstart: any;
  istart: any;
  jstart: any;
  kstart: any;
  lstart: any;
  ioistarta: any;
  ioistartb: any;
  ioistartc: any;
  signedIntoRace = false;
  newNextData: NextRaceV2[];
  fastEnabled = false;
  myIoiBalance = 0;
  myTrxBalance = 0;
  tickets = 0;
  myTeamStats: any;
  myTeamName: any;

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
    this.getRaceType();
    this.getAllRaces();
    this.fastFuelEnabled();
    this.getMydriverBalances();
    this.getMyTeam();
    this.toggleContent(1);
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
    return;
    this.astart = null;
    this.bstart = null;
    this.cstart = null;
    this.dstart = null;
    this.estart = null;
    this.fstart = null;
    this.gstart = null;
    this.hstart = null;
    this.istart = null;
    this.jstart = null;
    this.ioistarta = null;
    this.ioistartb = null;
    this.ioistartc = null;

    this.raceObserver = this.api.racesNextV2List().subscribe((data) => {
      const nedata: any = data;

      for (let x = 0; x < nedata.length; x++) {
        if (nedata[x].race_identifier === "car_race_ioi_1") {
          this.ioistarta = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_ioi_3") {
          this.ioistartb = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_ioi_5") {
          this.ioistartc = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_0") {
          this.astart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_10") {
          this.bstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_50") {
          this.cstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_100") {
          this.dstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_500") {
          this.estart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_short_1000") {
          this.fstart = nedata[x];
        }
        if (nedata[x].race_identifier === "car_race_24hrs_1000") {
          this.gstart = nedata[x];
        }
        if (nedata[x].race_identifier === "wednesday_party_race_0") {
          this.hstart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_0") {
          this.jstart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_10") {
          this.istart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_100") {
          this.istart = nedata[x];
        }
        if (nedata[x].race_identifier === "classic_tournament_1000") {
          this.istart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_0") {
          this.kstart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_10") {
          this.kstart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_100") {
          this.kstart = nedata[x];
        }
        if (nedata[x].race_identifier === "golden_ticket_1000") {
          this.kstart = nedata[x];
        }
        if (nedata[x].race_identifier === "tournament_for_ticket_0") {
          this.lstart = nedata[x];
        }
        if (nedata[x].my_cars_in_this_race.length > 0) {
          this.signedIntoRace = true;
        }
      }
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
}
