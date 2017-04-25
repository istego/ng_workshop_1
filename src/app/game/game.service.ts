import { Injectable } from '@angular/core';
import * as _ from 'lodash/index';

export const BOARD_SIZE = 20;
export const COLORS = {
  GAME_OVER: '#F44336',
  BOARD: '#37474F'
};
export const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ESC: 27,
  SPACE_BAR: 32,
  ENTER: 13
};

export class Part {
  public x: number;
  public y: number;
}

export class Fruit extends Part {
  public type: string;
}

export class Snake {
  public direction: number;
  public parts: Part[];
}

@Injectable()
export class GameService {
  public board: boolean[][];
  public fruit: Fruit;
  public isStarted: boolean;
  public fruitType: string[]  = [
    'apple',
    'avocado',
    'banana',
    'blueberries',
    'cherries',
    'grapes',
    'lemon',
    'lime',
    'orange',
    'peach',
    'pear',
    'pineapple',
    'pomegranate',
    'raspberry',
    'strawberry',
    'tomato'
  ];
  public score: number = 0;
  boardCol: number = BOARD_SIZE;
  boardRow: number = BOARD_SIZE;
  interval: number = 250;
  private snake: Snake;
  private isGameOver: boolean;
  private tempDirection: number;

  constructor() {
    this.setupBoard();
  }

  public addEvents(e: any) {
    switch (e.keyCode) {
      case KEYS.ESC:
        if (this.isStarted) {
          this.gameOver();
        }
        break;

      case KEYS.SPACE_BAR:
      case KEYS.ENTER:
        this.toggle();
        break;

      case KEYS.LEFT:
        if (this.snake.direction !== KEYS.RIGHT) {
          this.tempDirection = KEYS.LEFT;
        }
        break;

      case KEYS.UP:
        if (this.snake.direction !== KEYS.DOWN) {
          this.tempDirection = KEYS.UP;
        }
        break;

      case KEYS.RIGHT:
        if (this.snake.direction !== KEYS.LEFT) {
          this.tempDirection = KEYS.RIGHT;
        }
        break;

      case KEYS.DOWN:
        if (this.snake.direction !== KEYS.UP) {
          this.tempDirection = KEYS.DOWN;
        }
        break;
    }
  }

  public toggle() {
    this.isStarted ? this.gameOver() : this.start();
  }

  public setupBoard() {
    this.board = [];
    for (let i = 0; i < this.boardRow; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.boardCol; j++) {
        this.board[i][j] = false;
      }
    }
    this.fruit = {
      x: -1,
      y: -1,
      type: this.getFruitType()
    };
    this.snake = {
      direction: KEYS.LEFT,
      parts: [{
        x: -1,
        y: -1
      }]
    };
  }

  start() {
    this.isStarted = true;
    this.isGameOver = false;
    this.score = 0;

    this.snake.direction = KEYS.RIGHT;
    this.snake.parts = [];
    this.tempDirection = KEYS.RIGHT;

    for (let i: number = 0; i < 5; i++) {
      this.snake.parts.push({x: 10 + i, y: 10});
    }
    this.resetFruit();
    this.update();
  }

  private update() {
    if (this.isStarted) {
      setTimeout(() => {
        let newHead: Part = this.getNewHead();

        if (this.boardCollision(newHead) || this.selfCollision(newHead)) {
          return this.gameOver();
        } else if (this.fruitCollision(newHead)) {
          this.eatFruit();
        }

        // remove tail
        let oldTail: Part = this.snake.parts.pop();
        this.board[oldTail.y][oldTail.x] = false;

        // pop tail to head
        this.snake.parts.unshift(newHead);
        this.board[newHead.y][newHead.x] = true;

        // do it again
        this.snake.direction = this.tempDirection;
        this.update();
      }, this.interval);
    }
  }

  private gameOver() {
    this.isGameOver = true;

    setTimeout(() => {
      this.isGameOver = false;
    }, 500);

    this.isStarted = false;

    this.setupBoard();
  }

  private getNewHead() {
    const newHead: Part = _.cloneDeep(this.snake.parts[0]);

    // update Location
    switch (this.tempDirection) {
      case KEYS.LEFT:
        newHead.x -= 1;
        break;
      case KEYS.RIGHT:
        newHead.x += 1;
        break;
      case KEYS.UP:
        newHead.y -= 1;
        break;
      case KEYS.DOWN:
        newHead.y += 1;
        break;
    }
    return newHead;
  }

  private boardCollision(part: Part) {
    return part.x === this.boardRow || part.x === -1 || part.y === this.boardCol || part.y === -1;
  }

  private selfCollision(part: Part) {
    return this.board[part.y][part.x];
  }

  private fruitCollision(part: Part) {
    return part.x === this.fruit.x && part.y === this.fruit.y;
  }

  private eatFruit() {
    this.score++;

    let tail: Part = _.cloneDeep(this.snake.parts[this.snake.parts.length - 1]);
    this.snake.parts.push(tail);
    this.resetFruit();

    if (this.score % 5 === 0) {
      this.interval -= 15;
    }
  }

  private resetFruit() {
    const x: number = Math.floor(Math.random() * this.boardRow);
    const y: number = Math.floor(Math.random() * this.boardCol);

    if (this.board[y][x]) {
      return this.resetFruit();
    }
    this.fruit = {
      x,
      y,
      type: this.getFruitType()
    };
  }

  private getFruitType() {
    return this.fruitType[_.random(0, this.fruitType.length - 1)];
  }

  public getStyling() {
    return this.isGameOver ? COLORS.GAME_OVER : COLORS.BOARD;
  }

  public getFruit(col: number, row: number) {
    return this.fruit.x === row && this.fruit.y === col;
  }

  public getSnake(col: number, row: number) {
    return (this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) || this.board[col][row];
  }
}
