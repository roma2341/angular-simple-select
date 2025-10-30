import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSelectZigzag } from 'ngx-select-zigzag';
import { generateRandomOptions } from '../../../utils/ExampleUtils';

@Component({
  selector: 'example-2-themed-select',
  imports: [NgxSelectZigzag],
  templateUrl: './example-2-themed-select.html',
  styleUrl: './example-2-themed-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example2ThemedSelect {
  protected options = generateRandomOptions(1000);
}
