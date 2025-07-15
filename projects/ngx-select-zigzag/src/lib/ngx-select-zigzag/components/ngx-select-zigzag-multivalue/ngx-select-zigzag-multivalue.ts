import { ChangeDetectionStrategy, Component, computed, contentChild, input, Signal, TemplateRef } from '@angular/core';
import { SelectorOption, SelectorValue } from '../../../../types/SelectorTypes';
import { NgxSelectZigzagMultivalueItemTemplateDirective } from '../../directives/ngx-select-zigzag-multivalue-item-template/ngx-select-zigzag-multivalue-item-template.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ngx-select-zigzag-multivalue',
  imports: [NgTemplateOutlet],
  templateUrl: './ngx-select-zigzag-multivalue.html',
  styleUrl: './ngx-select-zigzag-multivalue.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSelectZigzagMultivalue {
  items = input<SelectorValue[]>([]);
  labelKey = input<string | undefined>();
  valueKey = input<string | undefined>();

  itemToLabel = computed(() => {
    const _labelKey = this.labelKey();
    return this.items().reduce<Map<SelectorValue, string>>((acc, item) => {
      const label = _labelKey ? item[_labelKey] : item.toString();
      acc.set(item, label);
      return acc as any;
    }, new Map<SelectorValue, string>());
  });

  itemTemplate = input<TemplateRef<any>>();
  // @ContentChild(NgOptionTemplateDirective, { read: TemplateRef }) optionTemplate: TemplateRef<any>;
}
