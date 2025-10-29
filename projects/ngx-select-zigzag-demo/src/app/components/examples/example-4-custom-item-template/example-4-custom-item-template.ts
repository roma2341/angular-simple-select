import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSelectZigzag, NgxSelectZigzagMultivalueItemTemplateDirective } from 'ngx-select-zigzag';
import { ExampleUtils } from '../../../utils/ExampleUtils';

@Component({
  selector: 'example-4-custom-item-template',
  imports: [NgxSelectZigzag, NgxSelectZigzagMultivalueItemTemplateDirective],
  templateUrl: './example-4-custom-item-template.html',
  styleUrl: './example-4-custom-item-template.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example4CustomItemTemplate {
  protected options = ExampleUtils.generateRandomOptions(1000);
}
