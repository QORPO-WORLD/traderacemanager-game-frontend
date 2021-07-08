import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-how-to",
  templateUrl: "./how-to.component.html",
  styleUrls: ["./how-to.component.scss"],
})
export class HowToComponent implements OnInit {
  menuItems: any;
  content = 1;
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
    if (this.content < 6) {
      this.content++;
    } else {
      this.content = 1;
    }
    this.menuItems.appendChild(this.menuItems.firstElementChild);
  }
  contentMinus() {
    if (this.content > 1) {
      this.content--;
    } else {
      this.content = 6;
    }
    this.menuItems.prepend(this.menuItems.lastElementChild);
  }
  contentSwitcher(content: number) {
    this.content = content;
  }
  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
