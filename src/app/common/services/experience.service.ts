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
    0, 1000, 2000, 4000, 8000, 16000, 32000, 48000, 72000, 108000,
    162000, 243000, 364000, 436000, 523000, 627000, 752000, 902000,
    1080000, 1390000, 1530000, 1680000, 1885000, 2030000
  ];

  constructor(driversData: any) {
    this.driversData = driversData;
  }

  getDriversMe() {
    return this.driversData;
  }

  getTotalBetAmount() {
    return this.getDriversMe().total_bet_amount;
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
      return this.expLevelStage[this.getCurrentExpLevel()];
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
      return this.getNextLevelExp() - this.getTotalBetAmount();
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
