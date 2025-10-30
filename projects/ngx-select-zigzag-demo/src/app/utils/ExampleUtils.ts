import { OptionItem } from './types';
import { loremIpsum } from 'lorem-ipsum';

export function generateRandomOptions(itemsCount: number) {
  const options: OptionItem[] = [];
  for (let i = 0; i < itemsCount; i++) {
    options.push({
      label: `Item(${i})`,
      value: i,
    });
  }
  return options;
}
export function generateLoremIpsumOptions(itemsCount: number, wordCount: number) {
  const options: OptionItem[] = [];
  for (let i = 0; i < itemsCount; i++) {
    const label = loremIpsum({
      count: 5, // Number of "words", "sentences", or "paragraphs"
      format: 'plain', // "plain" or "html"
      random: Math.random, // A PRNG function
      suffix: '\n', // Line ending, defaults to "\n" or "\r\n" (win32)
      units: 'words', // paragraph(s), "sentence(s)", or "word(s)"
    });
    options.push({
      label: `${label}(${i})`,
      value: i,
    });
  }
  return options;
}
