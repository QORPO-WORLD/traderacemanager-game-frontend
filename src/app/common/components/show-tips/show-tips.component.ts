import { Subscription } from 'rxjs';
import { TeamsService } from 'src/app/api/services';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-show-tips',
  templateUrl: './show-tips.component.html',
  styleUrls: ['./show-tips.component.scss'],
})
export class ShowTipsComponent implements OnInit, OnDestroy {
  tips = [];
  teamId: number;
  @Input() teamVersion = false;
  eventSubscription: Subscription;
  constructor(private api: TeamsService, private identityService: AuthService) { }

  ngOnInit() {
    this.getMyLeaderboard();
  }
  
  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  getMyLeaderboard() {
    const data = this.identityService.getLeaderboardMe();
    this.teamId = data.team_id;
    this.getTips();
  }

  getTips() {
    this.eventSubscription = this.api.getTips(this.teamId).subscribe(data => {
      this.tips = data;
    });
  }

}
