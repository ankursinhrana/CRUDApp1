import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';

import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [NgModule, CommonModule, BrowserModule, FormsModule, AgGridModule],
  declarations: [HomeComponent, ButtonRendererComponent],
  bootstrap: [HomeComponent]
})
export class Demo2Module { }
