import { Component, OnDestroy, OnInit } from "@angular/core";
import { Experience, ExperienceService } from "src/app/common/services/experience.service";

@Component({
  selector: "app-exp-bar",
  templateUrl: "./exp-bar.component.html",
  styleUrls: ["./exp-bar.component.scss"],
})
export class ExpBarComponent implements OnInit, OnDestroy {

  previousLevelExp: number;
  nextLevelExp: number;
  progressBarPercentage: number;
  needExpToNextLevel: number;
  activeFastRace: boolean;

  allCarsCosts: Array<Number> = [6000, 12000, 24000, 48000, 96000, 192000, 288000, 432000, 648000,
    972000, 1458000, 2187000, 3000000, 4320000, 5184000, 6220000, 7465000,
    8200000, 9000000, 9900000, 10890000, 12000000, 13200000];

  constructor(private experience: ExperienceService) {
    this.experience.load((data: Experience) => {
      this.previousLevelExp = data.getPreviousLevelExp();
      this.nextLevelExp = data.getNextLevelExp();
      this.progressBarPercentage = data.getProgressBarPercentage();
      this.needExpToNextLevel = data.getTotalBetAmount();
      this.activeFastRace = data.isActiveFastRace();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
