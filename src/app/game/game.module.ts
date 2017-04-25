import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/index';
import { GameComponent } from './game.component';
import { BoardComponent } from './board/index';
import { GameService } from './game.service';
import { SnakeComponent } from './snake/index';
import { FruitComponent } from './fruit/index';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    SnakeComponent,
    FruitComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [GameComponent],
  providers: [GameService]
})
export class GameModule {}
