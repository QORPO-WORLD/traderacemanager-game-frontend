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
