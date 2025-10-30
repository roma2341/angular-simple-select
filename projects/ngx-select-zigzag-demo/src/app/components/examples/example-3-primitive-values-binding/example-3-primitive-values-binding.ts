import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { NgxSelectZigzag } from 'ngx-select-zigzag';
import { SelectorValue } from '../../../../../../ngx-select-zigzag/src/types/SelectorTypes';
import { JsonPipe } from '@angular/common';
import { generateRandomOptions } from '../../../utils/ExampleUtils';

@Component({
  selector: 'example-3-primitive-values-binding',
  imports: [NgxSelectZigzag, JsonPipe],
  templateUrl: './example-3-primitive-values-binding.html',
  styleUrl: './example-3-primitive-values-binding.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example3PrimitiveValuesBinding {
  protected options = generateRandomOptions(1000);
  multiValue = model<SelectorValue[]>([]);
  setMultiValueFromJson(value: string) {
    const val = JSON.parse(value);
    this.multiValue.set(val);
  }
}
