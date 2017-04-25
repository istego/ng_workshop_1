import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { GameService } from './game.service';

@Component({
  selector: 'game',
  styleUrls: ['./game.component.scss'],
  templateUrl: './game.component.html',
  host: {
    '(document:keyup)': 'onKeyUp($event)'
  }
})
export class GameComponent {
  isSettingsOpen: boolean;
  public board: boolean[][];
  public settingForm: FormGroup;

  constructor(
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer,
    private gameService: GameService,
    private fb: FormBuilder
  ) {
    this.createForm();
    iconRegistry
      .addSvgIcon('circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/circle.svg'));

    this.gameService.fruitType.forEach((value: string) => {
      iconRegistry
        .addSvgIcon(value, sanitizer.bypassSecurityTrustResourceUrl(`assets/img/${value}.svg`));
    });

    this.board = this.gameService.board;
  }

  public onKeyUp(e) {
    this.gameService.addEvents(e);
  }

  public toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  private toggle() {
    this.gameService.toggle();
  }

  private isStarted() {
    return this.gameService.isStarted;
  }

  private score() {
    return this.gameService.score;
  }

  private fruitType() {
    return this.gameService.fruit.type;
  }

  private createForm() {
    this.settingForm = this.fb.group({
      interval: [this.gameService.interval, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
    });
  }

  onSubmit() {
    const formModel = this.settingForm.value;
    this.gameService.interval = formModel.interval;
  }
}
