import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  inject,
  input,
  model,
  signal,
  TemplateRef,
  ViewChild,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SelectorOption, SelectorValue } from '../../types/SelectorTypes';
import { SelectorOptionUtils } from '../../utils/SelectorOptionUtils';
import { SelectorOptionLabelPipe } from '../../pipes/selector-option-label-pipe';
import { CdkOverlayOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { SubSink } from 'subsink';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NgxSelectZigzagFormField } from '../features/input/ngx-select-zigzag-form-field/ngx-select-zigzag-form-field';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgxSelectZigzagMultivalue } from './components/ngx-select-zigzag-multivalue/ngx-select-zigzag-multivalue';
import { NgxSelectZigzagMultivalueItemTemplateDirective } from './directives/ngx-select-zigzag-multivalue-item-template/ngx-select-zigzag-multivalue-item-template.directive';

const KEY_CODE_TO_OPTIONS_OVERLAY_CLOSE = 'Escape';

@Component({
  selector: 'ngx-select-zigzag',
  imports: [
    SelectorOptionLabelPipe,
    CdkOverlayOrigin,
    NgxSelectZigzagFormField,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    NgxSelectZigzagMultivalue,
  ],
  templateUrl: './ngx-select-zigzag.html',
  styleUrl: './ngx-select-zigzag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngx-select-zigzag',
  },
})
export class NgxSelectZigzag implements ControlValueAccessor {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  options = input<SelectorOption[]>([]);
  labelKey = input<string | undefined>();
  valueKey = input<string | undefined>();
  multiple = input<boolean>(false);
  placeholder = input<string>('Select...');
  optionTemplate = input<TemplateRef<any>>();
  itemsDropdownClass = input<string>();

  value = model<SelectorValue | undefined>(undefined);
  multiValue = model<SelectorValue[]>([]);

  multiValueItemTemplate = contentChild(NgxSelectZigzagMultivalueItemTemplateDirective, {
    read: TemplateRef,
  });

  isOptionsDropDownOpen = signal(false);
  $isOptionsDropDownOpen = toObservable(this.isOptionsDropDownOpen);
  searchValue = signal<string>('');
  filteredOptions = computed(() => {
    const searchValue = this.searchValue();
    if (searchValue?.length > 0) {
      return this.options().filter((option) => {
        const optionLabel = this.getOptionLabel(option);
        const optionValue = this.getOptionValue(option);
        return (
          optionLabel.toLowerCase().includes(searchValue.toLowerCase()) ||
          optionValue.toString().toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    }
    return this.options();
  });

  valueToOption = computed<Map<SelectorValue, SelectorOption>>(() => {
    const res = new Map<SelectorValue, SelectorOption>();
    for (const option of this.options()) {
      const optionVal = this.getOptionValue(option);
      res.set(optionVal, option);
    }
    return res;
  });

  selectedOptions = computed(() => {
    const multiValue = this.multiValue();
    if (multiValue.length > 0) {
      return multiValue.map((val) => {
        return this.valueToOption().get(val) || SelectorOptionUtils.getEmptyOptionFromValue(val, this.valueKey());
      });
    }
    return [] as SelectorOption[];
    //return this.multiValue().map(v => this.getOptionLabel(v)).join(', ');
  });

  optionToSelectedFlag = computed(() => {
    const res = this.options().reduce<Map<SelectorOption, boolean>>((acc, opt) => {
      acc.set(opt, false);
      return acc;
    }, new Map<SelectorOption, boolean>());
    return res;
  });

  selectedOption = computed(() => {
    const val = this.value();
    if (val == null) {
      return undefined;
    }
    return this.valueToOption().get(val);
  });

  private overlayRef?: OverlayRef;
  private optionsDropDownOverlaySubscriptions = new SubSink();
  @ViewChild('overlayTemplate') overlayTemplate!: TemplateRef<any>;
  trigger = viewChild<CdkOverlayOrigin>('trigger');

  positionStrategy = computed(() => {
    const triggerNativeElement = this.trigger()?.elementRef?.nativeElement;
    if (triggerNativeElement == null) {
      return null;
    }
    return this.overlay
      .position()
      .flexibleConnectedTo(triggerNativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8, // Add some space between trigger and overlay
        },
        // Fallback positions
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
      ])
      .withFlexibleDimensions(true)
      .withPush(true);
    //.withViewportMargin(16); // Margin from viewport edges
  });

  constructor() {
    this.$isOptionsDropDownOpen
      .pipe(distinctUntilChanged(), debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((isPopupVisible) => {
        if (isPopupVisible) {
          this.openOptionsDropdownOverlay();
        } else {
          this.closeOptionsDropdownOverlay();
        }
      });
  }

  private closeOptionsDropdownOverlay() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
  openOptionsDropdownOverlay() {
    if (this.overlayRef != null) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
    const triggerWidth = this.trigger()?.elementRef?.nativeElement?.getBoundingClientRect().width;
    this.optionsDropDownOverlaySubscriptions.unsubscribe();
    // Create the overlay with the position strategy
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy()!,
      backdropClass: ['cdk-overlay-transparent-backdrop'],
      panelClass: this.itemsDropdownClass() ? [this.itemsDropdownClass()!] : undefined,
      hasBackdrop: true,
      width: triggerWidth,
      maxHeight: 'calc(100% - 64px)',
    });

    // Attach the template to the overlay
    const portal = new TemplatePortal(this.overlayTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    // Close the overlay on backdrop click
    this.optionsDropDownOverlaySubscriptions.sink = this.overlayRef.backdropClick().subscribe(() => {
      this.closeDropdown();
    });
  }

  toggleDropdown() {
    if (this.isOptionsDropDownOpen()) {
      this.closeDropdown();
      return;
    }
    this.openDropdown();
  }
  closeDropdown() {
    this.isOptionsDropDownOpen.set(false);
  }
  openDropdown() {
    this.isOptionsDropDownOpen.set(true);
  }

  selectOption(option: SelectorOption) {
    const optionVal = this.getOptionValue(option);
    if (this.multiple()) {
      const exists = this.multiValue().includes(optionVal);
      if (exists) {
        this.multiValue.set(this.multiValue().filter((v: SelectorValue) => v !== optionVal));
      } else {
        this.multiValue.set([...this.multiValue(), optionVal]);
      }
      this.onChange(this.multiValue());
    } else {
      this.value.set(optionVal);
      this.onChange(this.value());
      this.closeDropdown();
    }
  }

  isSelected(option: SelectorValue): boolean {
    const optValue = this.getOptionValue(option);
    return this.multiple() ? this.multiValue().includes(optValue) : this.value === optValue;
  }

  getOptionValue(option: SelectorOption): SelectorValue {
    return SelectorOptionUtils.getOptionValue(option, this.valueKey());
  }
  getOptionLabel(option: SelectorOption): string {
    return SelectorOptionUtils.getOptionLabel(option, this.labelKey());
  }
  clearValue() {
    this.value.set(undefined);
    this.multiValue.set([]);
  }
  inputKeyUp(value: string, event: KeyboardEvent) {
    if (event.code === KEY_CODE_TO_OPTIONS_OVERLAY_CLOSE) {
      this.closeOptionsDropdownOverlay();
    } else if (
      this.$isOptionsDropDownOpen &&
      ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowDown'].indexOf(event.code) === -1 /*ignore arrows*/
    ) {
      this.searchValue.set(value);
    }
    // else if (!this.optionsOpened && value) {
    //   this.optionsOpen(value);
    // }
  }

  /***
   CVA
   ***/

  private onChange = (_: SelectorValue | undefined) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
