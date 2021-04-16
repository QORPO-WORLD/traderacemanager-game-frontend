import { NotifiqService } from 'src/app/common/services/notifiq.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamsService } from 'src/app/api/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit, OnDestroy {
  ownerSubscribe: Subscription;
  notifySubscribe: Subscription;
  teamType = 1;
  color = '000000';
  teamName: string;
  loading = false;
  managersInvited = false;
  racerInvited = false;
  startTeamIndex = 0;
  myTeams: Array<any> = [
    { color: 'FF7474', id: 0 },
    { color: 'FF003D', id: 1 },
    { color: 'FF007A', id: 2 },
    { color: 'FF00A8', id: 3 },
    { color: 'FA00FF', id: 4 },
    { color: 'BD00FF', id: 5 },
    { color: '7E03DE', id: 6 },
    { color: '3300FF', id: 7 },
    { color: '0075FF', id: 8 },
    { color: '00D1FF', id: 9 },
    { color: '00FFFF', id: 10 },
    { color: '00FFE0', id: 11 },
    { color: '00FF75', id: 12 },
    { color: 'BDFF00', id: 13 },
    { color: 'FFF500', id: 14 },
    { color: 'FFD600', id: 15 },
    { color: 'FFA800', id: 16 },
    { color: 'FF7A00', id: 17 },
    { color: 'A34400', id: 18 },
    { color: '990000', id: 19 },
  ];
  constructor(private api: TeamsService, private route: Router, private notify: NotifiqService, private identityService: AuthService) { }

  ngOnInit() {
    this.selectColor(0);
  }

  ngOnDestroy() {
    if (this.ownerSubscribe) {
      this.ownerSubscribe.unsubscribe();
    }
    if (this.notifySubscribe) {
      this.notifySubscribe.unsubscribe();
    }
  }

  createTeam() {
    if (this.teamName.length > 0) {
      this.loading = true;
      this.ownerSubscribe = this.api.createTeam({
        "team_name": this.teamName,
        "color": this.color,
        "avatar": this.teamType
      }).subscribe(data => {
        this.loading = false;
        this.teamName = null;
        setTimeout(() => {
          this.identityService.updateDriverMe();
          this.identityService.updateBalance();
          this.notify.error('team created', 'Your team ' + this.teamName + ' has been created! Now you can invite members');
          //this.route.navigate(['/teams/my-team']);
        }, 500);
      });
    }
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  notifyTeam(type: string) {
    this.notifySubscribe = this.api.notifyTeam({
      "type": type
    }).subscribe(data => {
      if (type === 'racers') {
        this.racerInvited = true;
      } else {
        this.managersInvited = true;
      }
      this.notify.error('', 'Members have been notified!');
    });
  }

  nextTeam(){
    if (this.startTeamIndex < this.myTeams.length - 4) {
      this.startTeamIndex++;
    } else this.startTeamIndex = 0;
  }

  prevTeam(){
    if (this.startTeamIndex > 0) {
      this.startTeamIndex--;
    } else this.startTeamIndex = this.myTeams.length - 4;
  }

  selectColor(id: number){
    this.teamType = id;
    this.color = this.myTeams[id].color;
  }

}
