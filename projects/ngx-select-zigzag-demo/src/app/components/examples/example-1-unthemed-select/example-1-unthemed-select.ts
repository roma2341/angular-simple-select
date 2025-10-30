import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSelectZigzag } from 'ngx-select-zigzag';
import { generateRandomOptions } from '../../../utils/ExampleUtils';

@Component({
  selector: 'example-1-unthemed-select',
  imports: [NgxSelectZigzag],
  templateUrl: './example-1-unthemed-select.html',
  styleUrl: './example-1-unthemed-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example1UnthemedSelect {
  protected options = generateRandomOptions(1000);
}
