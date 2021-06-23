import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { loadConfettiShape } from "tsparticles-shape-confetti";

@Component({
  selector: 'app-binary-winner',
  templateUrl: './binary-winner.component.html',
  styleUrls: ['./binary-winner.component.scss'],
})
export class BinaryWinnerComponent implements OnInit {

  hasWon = false;
  repeatGame = false;
  requestDenied = false;
  loading = false;
  myAvatar: any;
  opponentPlayer: any;
  id = "tsparticles";
  

  particlesOptions = {
    fullScreen: {
      enable: true
    },
    particles: {
      number: {
        value: 0
      },
      color: {
        value: ["#ddd6b8", "#ead279", "#d0b25c", "#af8552"]
      },
      shape: {
        type: "confetti",
        options: {
          confetti: {
            type: ["circle", "square"]
          }
        }
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 2,
          startValue: "max",
          destroy: "min"
        }
      },
      size: {
        value: 9,
        random: {
          enable: true,
          minimumValue: 1
        }
      },
      life: {
        duration: {
          sync: true,
          value: 5
        },
        count: 1
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 20
        },
        speed: 50,
        decay: 0.05,
        direction: "none",
        outModes: {
          default: "destroy",
          top: "none"
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        resize: true
      }
    },
    detectRetina: true,
    background: {
      color: "transparent"
    },
    responsive: [
      {
        maxWidth: 700,
        options: {
          particles: {
            move: {
              speed: 30,
              decay: 0.05
            }
          }
        }
      }
    ],
    emitters: [
      {
        direction: "top-right",
        rate: {
          delay: 0.1,
          quantity: 8
        },
        position: {
          x: 0,
          y: 50
        },
        size: {
          width: 0,
          height: 0
        }
      },
      {
        direction: "top-left",
        rate: {
          delay: 0.1,
          quantity: 10
        },
        position: {
          x: 100,
          y: 50
        },
        size: {
          width: 0,
          height: 0
        }
      }
    ]
  };

  racers: Array<any> = [
    {
      id: 1,
      name: 'Axle',
      image: 'white-trm',
    },
    {
      id: 2,
      name: 'Flash',
      image: 'red-trm',
    },
    {
      id: 3,
      name: 'Octane',
      image: 'blue-trm',
    },
    {
      id: 4,
      name: 'Punisher',
      image: 'black-trm',
    },
    {
      id: 5,
      name: 'Lady Rich',
      image: 'lady-rich',
    },
    {
      id: 6,
      name: 'Rich Jr.',
      image: 'bad-boy',
    },
    {
      id: 7,
      name: 'Mrs. Rich',
      image: 'mrs-rich',
    },
    {
      id: 8,
      name: 'Mr. Rich',
      image: 'mr-rich',
    }
  ];
  @Input() winner: any;
  @Input() loser: any;
  @Input() meWon: any;
  @Output() fatality: EventEmitter<any> = new EventEmitter();
  
  constructor(private route: Router) { }

  ngOnInit() {
    this.hasWon = this.meWon;
  }

  fatalityDo() {
    this.fatality.emit(1);
  }

  repeat() {
    this.route.navigate(['/race/binary-fuel']);
    return;


    this.repeatGame = true;
    this.myAvatar = this.racers[this.randomInteger(0,7)];
    this.loading = true;

    this.opponentPlayer = {
      avatar: this.racers[this.randomInteger(0,7)],
      name: 'Oponent' + this.randomInteger(0,100),
    }
    setTimeout(() => {
      this.opponentPlayer = undefined;
      this.requestDenied = true;
      this.loading = false;
     }, 3000);
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  automatch(){

    this.loading = true;
    setTimeout(() => {
      this.opponentPlayer = {
        avatar: this.racers[this.randomInteger(0,7)],
        name: 'Oponent' + this.randomInteger(0,100),
      }
      this.requestDenied = false;
      this.loading = false;
     }, 2500);
  }

  particlesInit(main: any): void {
    loadConfettiShape(main);
  }

}
