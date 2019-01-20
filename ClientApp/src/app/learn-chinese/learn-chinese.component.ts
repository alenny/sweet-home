import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


const CHARACTERS: string[] = [
  'assets/images/char/爱.jpg',
  'assets/images/char/吃.jpg',
  'assets/images/char/永.png',
  'assets/images/char/中.jpg',
  'assets/images/char/字.jpg'
];

@Component({
  selector: 'app-learn-chinese',
  templateUrl: './learn-chinese.component.html',
  styleUrls: ['./learn-chinese.component.css'],
  providers: [NgbCarouselConfig]
})
export class LearnChineseComponent implements OnInit {

  characters: string[] = CHARACTERS;

  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
  }

  ngOnInit() {
  }
}
