import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSelectZigzag } from 'ngx-select-zigzag';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSelectZigzag],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected options = generateRandomOptions(1000);
}
type OptionItem = {
  label: string;
  value: string;
};
function generateRandomOptions(itemsCount: number) {
  const options: OptionItem[] = [];
  for (let i = 0; i < itemsCount; i++) {
    options.push({
      label: `Item(${i})`,
      value: `Value(${i})`,
    });
  }
  return options;
}
