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
  avatarType = 0;
  color = '000000';
  teamName: string;
  loading = false;
  constructor(private api: TeamsService, private route: Router, private notify: NotifiqService, private identityService: AuthService) { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.ownerSubscribe) {
      this.ownerSubscribe.unsubscribe();
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
        this.teamName = null;
        setTimeout(() => {
          this.identityService.updateDriverMe();
          this.identityService.updateBalance();
          this.notify.error('team created', 'Your team ' + this.teamName + ' has been created!');
          this.route.navigate(['/teams/my-team']);
        }, 500);
      });
    }
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

}
