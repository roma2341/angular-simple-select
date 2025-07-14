import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SelectorOption, SelectorValue } from '../../../../types/SelectorTypes';

@Component({
  selector: 'ngx-select-zigzag-multivalue',
  imports: [],
  templateUrl: './ngx-select-zigzag-multivalue.html',
  styleUrl: './ngx-select-zigzag-multivalue.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSelectZigzagMultivalue {
  items = input<SelectorValue[]>([]);
  labelKey = input<string | undefined>();
  valueKey = input<string | undefined>();
}
