import { Component, Input } from '@angular/core';

@Component({
  selector: 'fruit',
  templateUrl: './fruit.component.html'
})
export class FruitComponent {
  @Input() type: string;
}
