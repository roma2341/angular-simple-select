import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSelectZigzag } from 'ngx-select-zigzag';
import { ExampleUtils } from '../../../utils/ExampleUtils';

@Component({
  selector: 'example-1-unthemed-select',
  imports: [NgxSelectZigzag],
  templateUrl: './example-1-unthemed-select.html',
  styleUrl: './example-1-unthemed-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example1UnthemedSelect {
  protected options = ExampleUtils.generateRandomOptions(1000);
}
