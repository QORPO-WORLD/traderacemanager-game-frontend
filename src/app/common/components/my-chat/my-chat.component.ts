import { AuthService } from 'src/app/user/services/auth.service';
import { TeamChatMembers } from '../../../api/models/team-chat-members';
import { SendChatMessage } from '../../../api/models/send-chat-message';
import { ChatMessage } from '../../../api/models/chat-message';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService, TeamChatService, LeaderboardService, RewardsService, RacesService } from 'src/app/api/services';
import { NotifiqService } from '../../../common/services/notifiq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.scss'],
})
export class MyChatComponent implements OnInit {

  tchatObserver: Subscription;
  postchatObserver: Subscription;
  tmObserver: Subscription;
  drObserver: Subscription;
  raceObserver: Subscription;
  chatList: ChatMessage[];
  interval: any;
  chatPosting: SendChatMessage;
  chatInput = '';
  myTeam: any;
  reverse = false;
  @Input() type = false;
  tmembers = [];
  myDriver = '';
  myDriverStats: any;
  teamreward: any;

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
  ioistarta: any;
  ioistartb: any;
  ioistartc: any;
  Affilate: any;
  signedIntoRace = false;
  chatLength = 0;
  constructor(private api: TeamChatService, private drvrscrv: DriversService,
    private router: Router, protected notify: NotifiqService, private lead: LeaderboardService,
    private identityService: AuthService, private apichat: TeamChatService,
  private rapi: RewardsService, protected raceService: RacesService) { }

  ngOnInit() {
    this.getMyTem();
    this.getDriver();
    this.getMyLevel();
    
    this.tchatObserver = this.api.teamChatList(200).subscribe(
      data => {
        this.chatList = data;
        this.chatLength = this.chatList.length;
      }
    );
    this.getteammembers();
    this.getRewards();
    this.getAllRaces();

    this.interval = setInterval(() => {
      this.getChat();
      this.getteammembers();
    }, 5000);
  }

  getChat() {
    this.tchatObserver = this.api.teamChatList(200).subscribe(
      data => {
        this.chatList = data;
        this.recognizeChatSum();
      }
    );
  }
  getMyLevel() {
    this.Affilate = this.identityService.getStorageAff();
  }


  recognizeChatSum() {
    if (this.chatList.length !== this.chatLength) {
      const obj = document.createElement('audio');
      obj.src = './assets/base/sounds/chat.mp3';
      obj.play();
      this.chatLength = this.chatList.length;
    }
  }


  ngOnDestroy() {
    if (this.tchatObserver) {
      this.tchatObserver.unsubscribe();
    }
    if (this.drObserver) {
      this.drObserver.unsubscribe();
    }

    clearInterval(this.interval);
  }

  getMyTem() {
    this.tmObserver = this.lead.leaderboardTeamInternalList().subscribe(
      data => {
        this.myTeam = data;
      }
    );
  }

  postChat() {
    if (this.chatInput.length === 0) {
      return;
    }
    this.postchatObserver = this.api.teamChatCreate(this.serializeChatMessage()).subscribe(
      data => {
        this.getChat();
        this.chatInput = '';
      }
    );
  }

  serializeChatMessage() {
    const message = {
      message: this.chatInput,
      is_race24: this.type,
      is_admin_message: false
    };

    return message;
  }

  getDriver() {
    const data = this.identityService.getStorageIdentity();
    this.myDriver = data.id;
    this.myDriverStats = data;

  }

  getteammembers() {
    this.tmObserver = this.apichat.teamChatMembersList().subscribe(data => {
      this.tmembers = data;
    });
  }


  getRewards() {
    this.rapi.rewardsList()
      .subscribe(data => {
        this.teamreward = data.team_bonus;
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

    this.raceObserver = this.raceService.racesNextV2List().subscribe(data => {
      const nedata: any = data;

      for (let x = 0; x < nedata.length; x++) {
        if (nedata[x].race_identifier === 'car_race_ioi_1') { this.ioistarta = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_3') { this.ioistartb = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_ioi_5') { this.ioistartc = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_0') { this.astart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_10') { this.bstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_50') { this.cstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_100') { this.dstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_500') { this.estart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_short_1000') { this.fstart = nedata[x]; }
        if (nedata[x].race_identifier === 'car_race_24hrs_1000') { this.gstart = nedata[x]; }
        if (nedata[x].race_identifier === 'wednesday_party_race_0') { this.hstart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_0') { this.jstart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_10') { this.istart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_100') { this.istart = nedata[x]; }
        if (nedata[x].race_identifier === 'classic_tournament_1000') { this.istart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_0') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_10') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_100') { this.kstart = nedata[x]; }
        if (nedata[x].race_identifier === 'golden_ticket_1000') { this.kstart = nedata[x]; }
        if (nedata[x].my_cars_in_this_race.length > 0) { this.signedIntoRace = true; }
      }
    });
  }


}
