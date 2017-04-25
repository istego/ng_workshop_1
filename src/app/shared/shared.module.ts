import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdToolbarModule, MdIconModule, MdInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const modules = [
  CommonModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  MdButtonModule,
  MdToolbarModule,
  MdIconModule,
  MdInputModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule {}
