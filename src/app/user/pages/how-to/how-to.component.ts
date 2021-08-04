import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-how-to",
  templateUrl: "./how-to.component.html",
  styleUrls: ["./how-to.component.scss"],
})
export class HowToComponent implements OnInit {
  menuItems: any;
  content = 1;
  animation = false;
  menu: Array<string> = [
    "Leaderboard",
    "Intro",
    "NFT Cars",
    "Non NFT Cars",
    "Races",
    "Seasons and Ranking",
    "Leaderboard",
    "Intro",
  ];
  constructor() {}

  ngOnInit() {
    this.getElements();
  }

  getElements() {
    this.menuItems = document.getElementById("items");
    console.log(this.menuItems);
  }
  /*
  scrollMenuLeft() {
    this.menuItems.prepend(this.menuItems.lastElementChild);
    let timeout1 = window.setTimeout(() => {
      this.menuItems.setAttribute(
        'style',
        `transform: translateX(-33.33333%);`
      );
    }, 10);
  }
  scrollMenuRight() {
    this.menuItems.setAttribute('style', 'transition: 0.3s;');
    let timeout1 = window.setTimeout(() => {
      this.menuItems.setAttribute(
        'style',
        `transform: translateX(-33.33333%);`
      );
      clearTimeout(timeout1);
    }, 1);
    let timeout2 = window.setTimeout(() => {
      this.menuItems.setAttribute('style', 'transition: 0s;');
      let timeout3 = window.setTimeout(() => {
        this.menuItems.appendChild(this.menuItems.firstElementChild);
        this.menuItems.setAttribute(
          'style',
          `transform: translateX(-33.33333%);`
        );
        clearTimeout(timeout3);
      }, 5);

      clearTimeout(timeout2);
    }, 350);
  }
  */
  contentPlus() {
    this.animation = true;
    this.menuItems.setAttribute("style", `transform: translateX(-66.66666%);`);
    if (this.content < 5) {
      this.content++;
    } else {
      this.content = 1;
    }
    let timeout1 = window.setTimeout(() => {
      this.menuItems.setAttribute(
        "style",
        `transform: translateX(-66.66666%); transition: 0.3s`
      );
      clearTimeout(timeout1);
    }, 300);

    let timeout3 = window.setTimeout(() => {
      this.menuItems.setAttribute(
        "style",
        `transform: translateX(-33.33333%); transition: 0s`
      );
      clearTimeout(timeout3);
    }, 300);

    let timeout5 = window.setTimeout(() => {
      this.menuItems.appendChild(this.menuItems.firstElementChild);
      this.animation = false;
      clearTimeout(timeout5);
    }, 300);
  }

  contentMinus() {
    this.animation = true;
    this.menuItems.setAttribute("style", `transform: translateX(0%);`);
    if (this.content > 1) {
      this.content--;
    } else {
      this.content = 5;
    }
    let timeout1 = window.setTimeout(() => {
      this.menuItems.setAttribute(
        "style",
        `transform: translateX(0%); transition: 0.3s`
      );
      clearTimeout(timeout1);
    }, 300);

    let timeout3 = window.setTimeout(() => {
      this.menuItems.setAttribute(
        "style",
        `transform: translateX(-33.33333%); transition: 0s`
      );
      clearTimeout(timeout3);
    }, 300);

    let timeout5 = window.setTimeout(() => {
      this.menuItems.prepend(this.menuItems.lastElementChild);
      this.animation = false;
      clearTimeout(timeout5);
    }, 300);
  }
  contentSwitcher(content: number) {
    this.content = content;
  }
  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  joinTelegram() {
    window.open("https://t.me/TradingIOI", "_blank").focus();
  }
}
