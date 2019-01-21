import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChineseService } from '../services/chinese.service';

const charFolder = 'chinese-characters/';

@Component({
  selector: 'app-learn-chinese',
  templateUrl: './learn-chinese.component.html',
  styleUrls: ['./learn-chinese.component.css'],
  providers: [NgbCarouselConfig]
})
export class LearnChineseComponent implements OnInit {

  charImages: string[] = [];
  characters: string;
  password: string;

  constructor(
    config: NgbCarouselConfig,
    private chineseService: ChineseService) {
    config.interval = 0;
  }

  ngOnInit() {
    this.getCharacters();
  }

  onAddCharacters() {
    this.chineseService.addCharacters(this.characters, this.password)
      .subscribe(
        _ => {
          this.getCharacters();
          alert(`${this.characters} have been successfully added.`);
        },
        err => this.handleError(err)
      );
  }

  onDeleteCharacters() {
    this.chineseService.deleteCharacters(this.characters, this.password)
      .subscribe(
        _ => {
          this.getCharacters();
          alert(`${this.characters} have been successfully deleted.`);
        },
        err => this.handleError(err)
      );
  }

  private getCharacters() {
    this.chineseService.getCharacters()
      .subscribe(
        res => {
          this.charImages = [];
          for (let ch of res.characters) {
            this.charImages.push(charFolder + ch + '.png');
          }
        },
        err => this.handleError(err)
      )
  }

  private handleError(err: any) {
    let msg = err.error ? err.statusText + ' ' + err.error.errorMessage : err.statusText
    alert(`Failed: ${err.status} ${msg}`);
  }
}
