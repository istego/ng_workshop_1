import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'board',
  styleUrls: ['./board.component.scss'],
  templateUrl: './board.component.html'
})
export class BoardComponent{
  @Input() boardIn: boolean[][];

  constructor(private gameService: GameService) {
    this.gameService.start();
  }

  setSnake(col: number, row: number) {
    return this.gameService.getSnake(col, row);
  }

  fruitType() {
    return this.gameService.fruit.type;
  }

  setFruit(col: number, row: number) {
    return this.gameService.getFruit(col, row);
  }
}
