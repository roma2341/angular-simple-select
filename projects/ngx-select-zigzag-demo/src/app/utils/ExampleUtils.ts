import { OptionItem } from './types';

export abstract class ExampleUtils {
  public static generateRandomOptions(itemsCount: number) {
    const options: OptionItem[] = [];
    for (let i = 0; i < itemsCount; i++) {
      options.push({
        label: `Item(${i})`,
        value: i,
      });
    }
    return options;
  }
}
