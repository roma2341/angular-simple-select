import { SelectorOption, SelectorValue } from '../types/SelectorTypes';

export abstract class SelectorOptionUtils {
  public static getOptionValue(option: SelectorOption, valueKey?: string): SelectorValue {
    return valueKey ? option[valueKey as keyof object] : option;
  }
  public static getOptionLabel(option: SelectorOption, labelKey?: string): string {
    return labelKey ? option[labelKey as keyof object] : (option as string);
  }

  public static getEmptyOptionFromValue(value: SelectorValue, valueKey?: string): SelectorOption {
    if (valueKey == null) {
      return value;
    }
    return {
      [valueKey]: value,
    };
  }
}
