import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSelectZigzag } from 'ngx-select-zigzag';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSelectZigzag],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ngx-select-zigzag-demo';
  protected options: OptionItem[] = [
    {
      label: 'Canada',
      value: 'CA',
    },
    {
      label: 'United States',
      value: 'US',
    },
    {
      label: 'Mexico',
      value: 'MX',
    },
  ];
}
type OptionItem = {
  label: string;
  value: string;
};
