import { Pipe, PipeTransform } from '@angular/core';
import {SelectorOption} from '../types/SelectorTypes';
import {SelectorOptionUtils} from '../utils/SelectorOptionUtils';

@Pipe({
  name: 'selectorOptionLabel',
  pure: true
})
export class SelectorOptionLabelPipe implements PipeTransform {

  transform(option: SelectorOption, ...args: unknown[]): unknown {
    return SelectorOptionUtils.getOptionLabel(option);
  }

}
