import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgxSelectZigzag } from 'ngx-select-zigzag';
import { OptionItem } from '../../../utils/types';
import { JsonPipe } from '@angular/common';
import { generateRandomOptions } from '../../../utils/ExampleUtils';

@Component({
  selector: 'example-5-compare-with',
  imports: [NgxSelectZigzag, JsonPipe],
  templateUrl: './example-5-compare-with.html',
  styleUrl: './example-5-compare-with.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example5CompareWith {
  protected options = signal(generateRandomOptions(1000));
  protected selectedItems = signal<OptionItem[]>([]);
  protected selectedItem = signal<OptionItem | undefined>(undefined);
  protected comparator = (a: OptionItem, b: OptionItem) => {
    return a.value === b.value;
  };

  trackByFn(a: OptionItem) {
    return a.value;
  }

  deepCloneSelectedItems() {
    this.selectedItems.set(structuredClone(this.selectedItems()));
  }

  deepCloneSelectedItem() {
    this.selectedItem.set(structuredClone(this.selectedItem()));
  }

  deepCloneOptions() {
    this.options.set(structuredClone(this.options()));
  }
}
