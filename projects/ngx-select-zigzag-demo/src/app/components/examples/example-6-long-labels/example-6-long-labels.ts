import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgxSelectZigzag } from 'ngx-select-zigzag';
import { generateLoremIpsumOptions, generateRandomOptions } from '../../../utils/ExampleUtils';

@Component({
  selector: 'example-6-long-labels',
  imports: [NgxSelectZigzag],
  templateUrl: './example-6-long-labels.html',
  styleUrl: './example-6-long-labels.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example6LongLabels {
  protected options = signal(generateLoremIpsumOptions(1000, 7));
}
