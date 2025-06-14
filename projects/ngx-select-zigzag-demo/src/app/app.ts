import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSelectZigzag} from 'ngx-select-zigzag';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSelectZigzag],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ngx-select-zigzag-demo';
}
