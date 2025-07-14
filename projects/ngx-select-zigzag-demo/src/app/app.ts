import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Example1UnthemedSelect } from './components/examples/example-1-unthemed-select/example-1-unthemed-select';
import { Example2ThemedSelect } from './components/examples/example-2-themed-select/example-2-themed-select';
import { Example3PrimitiveValuesBinding } from './components/examples/example-3-primitive-values-binding/example-3-primitive-values-binding';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Example1UnthemedSelect, Example2ThemedSelect, Example3PrimitiveValuesBinding],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
