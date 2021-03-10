import { AuthService } from './../../user/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService as __BaseService } from '../../api/base-service';
import { ApiConfiguration as __Configuration } from '../../api/api-configuration';
import { Subscription } from 'rxjs';
import { DriversService } from '../../api/services';

class Experience {

  private driversData: any;
  private readonly MIN_DRIVERS = 5;
  private expLevelStage = [
    6000, 12000, 24000, 48000, 96000, 192000, 288000, 432000, 648000,
    972000, 1458000, 2187000, 3000000, 4320000, 5184000, 6220000, 7465000,
    8200000, 9000000, 9900000, 10890000, 12000000, 13200000
  ];

  constructor(driversData: any) {
    this.driversData = driversData;
  }

  getDriversMe() {
    return this.driversData;
  }

  getTotalBetAmount() {
    const balance = JSON.parse(localStorage.getItem('auth-us'));
    return balance.total_bet_amount;
  }

  getPlayedRacesCount() {
    return this.getDriversMe().total_races;
  }

  getCurrentExpLevel() {
    if (!this.isActiveFastRace()) {
      return 0;
    } else {
      return this.findCurrentLevelStage();
    }
  }

  getPreviousLevelExp() {
    if (!this.isActiveFastRace()) {
      return 0;
    } else {
      return this.expLevelStage[this.getCurrentExpLevel() -1];
    }
  }

  getNextLevelExp() {
    if (!this.isActiveFastRace()) {
      return this.MIN_DRIVERS;
    } else {
      return this.expLevelStage[this.getCurrentExpLevel() + 1];
    }
  }

  getNeedExpToNextLevel() {
    if (!this.isActiveFastRace()) {
      return this.MIN_DRIVERS - this.getPlayedRacesCount();
    } else {
      console.log(this.getNextLevelExp());
      console.log(this.getTotalBetAmount());
      return (this.getNextLevelExp() + 1) - this.getTotalBetAmount();
    }
  }

  getProgressBarPercentage() {
    let expDistance = this.getNextLevelExp() - this.getPreviousLevelExp();
    let onePercentage = expDistance / 100;

    let progressPercentage: number;
    if (!this.isActiveFastRace()) {
      progressPercentage = this.getPlayedRacesCount() / 5 * 100;
    } else {

      progressPercentage = (this.getTotalBetAmount() - this.getPreviousLevelExp()) / (onePercentage);
      //progressPercentage = (this.getTotalBetAmount() / this.getPreviousLevelExp()) * 100;
    }

    if (progressPercentage > 100) {
      return 100;
    }

    return progressPercentage;
  }

  isActiveFastRace() {
    return this.getPlayedRacesCount() >= this.MIN_DRIVERS;
  }

  private findCurrentLevelStage() {
    for (let i = 0; i < this.expLevelStage.length - 1; i++) {
      if (this.expLevelStage[i] <= this.getTotalBetAmount() && this.expLevelStage[i + 1] > this.getTotalBetAmount()) {
        return i;
      }
    }

    return this.expLevelStage.length - 1;
  }

}
@Injectable({
  providedIn: 'root',
})
class ExperienceService extends __BaseService {

  constructor(config: __Configuration, http: HttpClient, protected api: DriversService, private ath: AuthService) {
    super(config, http);
  }

  load(callback: Function) {

    const driversData = this.ath.getDriverMe();
    const experience: Experience = new Experience(driversData);
    callback(experience);

  }

}


export { ExperienceService, Experience };
