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
  avatarType = 0;
  color = '990000';
  teamName: string;
  loading = false;
  managersInvited = false;
  racerInvited = false;
  teamCreated = false;
  constructor(private api: TeamsService, private route: Router, private notify: NotifiqService, private identityService: AuthService) { }

  ngOnInit() { }

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
        "avatar": this.avatarType
      }).subscribe(data => {
        this.loading = false;
        this.teamCreated = true;
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

}
