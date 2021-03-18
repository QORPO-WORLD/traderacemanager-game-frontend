import { ExperienceService } from 'src/app/common/services/experience.service';
import { DriversService, RacesService, LeaderboardService } from 'src/app/api/services';
import { NextRaceV2 } from './../../../api/models/next-race-v2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';
@Component({
  selector: 'app-race-type',
  templateUrl: './race-type.component.html',
  styleUrls: ['./race-type.component.scss'],
})
export class RaceTypeComponent implements OnInit, OnDestroy {
  raceType: any;
  raceObserver: Subscription;
  favObserver: Subscription;
  teamSubscription: Subscription;
  updateFavCoinsObserver: Subscription;
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
  atour: any;
  btour: any;
  ctour: any;
  dtour: any;
  ioistarta: any;
  ioistartb: any;
  ioistartc: any;
  enastart: any;
  enbstart: any;
  encstart: any;
  endstart: any;
  enestart: any;
  signedIntoRace = false;
  newNextData: NextRaceV2[];
  fastEnabled = false;
  myIoiBalance = 0;
  myTrxBalance = 0;
  tickets = 0;
  ready = false;
  baseFavRaces = [
    { type: 'car_race_short_0', fav: false },
    { type: 'car_race_ioi_10', fav: false },
    { type: 'car_race_ioi_50', fav: false },
    { type: 'car_race_ioi_100', fav: false },
    { type: 'car_race_short_500', fav: false },
    { type: 'car_race_short_1000', fav: false },
    { type: 'car_race_24hrs_1000', fav: false },
    { type: 'wednesday_party_race_0', fav: false },
    { type: 'classic_tournament_0', fav: false },
    { type: 'classic_tournament_5', fav: false },
    { type: 'classic_tournament_10', fav: false },
    { type: 'classic_tournament_100', fav: false },
    { type: 'golden_ticket_0', fav: false },
    { type: 'car_race_ioi_1', fav: false },
    { type: 'car_race_ioi_3', fav: false },
    { type: 'car_race_ioi_5', fav: false },
    { type: 'tournament_for_ticket_0', fav: false },
    { type: 'tournament_for_ticket_0', fav: false },
    { type: 'car_race_enduro_1', fav: false },
    { type: 'car_race_enduro_5', fav: false },
    { type: 'car_race_enduro_10', fav: false },
    { type: 'car_race_enduro_50', fav: false },
    { type: 'car_race_enduro_0', fav: false },
  ];
  myFavRaces = [];
  myTeam: any;
  constructor(private route: ActivatedRoute, private experience: ExperienceService, protected api: RacesService,
    private dapi: DriversService, private identityService: AuthService, private lapi: LeaderboardService) { }

  ngOnInit() {
    this.getRaceType();
    this.getAllRaces();
    this.fastFuelEnabled();
    this.getMydriverBalances();
    this.getmyFavRaces();
    this.getMyTeamReward();
  }

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  getRaceType(){
    this.raceObserver = this.route
      .queryParams
      .subscribe(params => { 
        this.raceType = params['raceType'].toString();
        if (params['raceType'].length <= 0) { this.raceType = 'fast'; }
        console.log(this.raceType);
      });
  }


  getAllRaces() {
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
    this.atour = null;
    this.btour = null;
    this.ctour = null;
    this.dtour = null;
    this.ioistarta = null;
    this.ioistartb = null;
    this.ioistartc = null;

    this.raceObserver = this.api.racesNextV2List().subscribe(data => {
      const nedata: any = data;

      for (let x = 0; x < nedata.length; x++) {
        if (nedata[x].race_identifier === 'car_race_ioi_1') { this.ioistarta = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_3') { this.ioistartb = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_5') { this.ioistartc = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_0') { this.astart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_10') { this.bstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_50') { this.cstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_100') { this.dstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_500') { this.estart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_1000') { this.fstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_24hrs_1000') { this.gstart = nedata[x]; }
        if (nedata[x].race_identifier === 'wednesday_party_race_0') { this.hstart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_0') { this.atour = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_5') { this.btour = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_10') { this.ctour = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_100') { this.dtour = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_0') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_10') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_100') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_1000') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'tournament_for_ticket_0') { this.lstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_enduro_1') { this.enastart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_enduro_5') { this.enbstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_enduro_10') { this.encstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_enduro_50') { this.endstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_enduro_100') { this.enestart = nedata[x]; }
      }
      this.newNextData = nedata;
      this.ready = true;
    });
  }

  fastFuelEnabled() {
    this.dapi.driversFavFuelList().subscribe(
      data => {
        const datax: any = data;
        if (datax.length > 0) {
          this.fastEnabled = true;
        }
      }
    );
  }

  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
    this.myIoiBalance = this.myDriverBalances.game_wallet_ioi + this.myDriverBalances.stake_wallet_ioi +
      this.myDriverBalances.nitro_wallet_ioi;
    const datax =  this.identityService.getStorageIdentity();
    this.tickets = datax.tournament_tickets;
  }



  getmyFavRaces() {
    this.favObserver = this.dapi.driversFavRacesList().subscribe(data => {
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
    console.log(this.baseFavRaces);
  }



  updateFavRaces() {


    const data: any = [];
    for (let y = 0; y < this.baseFavRaces.length; y++) {
      if (this.baseFavRaces[y].fav === true) {
        data.push(this.baseFavRaces[y].type);
      }
    }

    this.updateFavCoinsObserver = this.dapi.driversFavRacesUpdate(
      { race_identifiers: data }
    ).subscribe(datax => {
      this.getmyFavRaces();
    });
  }


  getMyTeamReward() {
    this.teamSubscription = this.lapi.leaderboardTeamInternalList().subscribe(
      data => {
        this.myTeam = data.team_bonus;
      }
    );
  }



}
