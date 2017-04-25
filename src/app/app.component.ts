import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    iconRegistry: MdIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry
      .addSvgIcon('snake', sanitizer.bypassSecurityTrustResourceUrl('assets/img/snake.svg'));
  }
}
