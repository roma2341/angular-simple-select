import {
  ChangeDetectionStrategy,
  Component,
  computed,
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

@Component({
  selector: 'ngx-select-zigzag',
  imports: [SelectorOptionLabelPipe, CdkOverlayOrigin],
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

  value = model<SelectorValue | undefined>(undefined);
  multiValue = model<SelectorValue[]>([]);

  isItemsDropDownOpen = signal(false);
  $isItemsDropDownOpen = toObservable(this.isItemsDropDownOpen);

  optionValueToOption = computed<Map<SelectorValue, SelectorOption>>(() => {
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
        return this.optionValueToOption().get(val);
      });
    }
    return [];
    //return this.multiValue().map(v => this.getOptionLabel(v)).join(', ');
  });

  selectedOption = computed(() => {
    const val = this.value();
    if (val == null) {
      return undefined;
    }
    return this.optionValueToOption().get(val);
  });

  private overlayRef?: OverlayRef;
  private overlaySubscriptions = new SubSink();
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
    this.$isItemsDropDownOpen
      .pipe(distinctUntilChanged(), debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((isPopupVisible) => {
        if (isPopupVisible) {
          this.openOverlay();
        } else {
          this.closeOverlay();
        }
      });
  }

  private closeOverlay() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
  openOverlay() {
    if (this.overlayRef != null) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
    this.overlaySubscriptions.unsubscribe();
    // Create the overlay with the position strategy
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy()!,
      backdropClass: ['cdk-overlay-transparent-backdrop'],
      hasBackdrop: true,
      width: '477px',
      maxHeight: 'calc(100% - 64px)',
    });

    // Attach the template to the overlay
    const portal = new TemplatePortal(this.overlayTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    // Close the overlay on backdrop click
    this.overlaySubscriptions.sink = this.overlayRef.backdropClick().subscribe(() => {
      this.isItemsDropDownOpen.set(false);
    });
  }

  toggleDropdown() {
    if (this.isItemsDropDownOpen()) {
      this.closeDropdown();
      return;
    }
    this.openDropdown();
  }
  closeDropdown() {
    this.isItemsDropDownOpen.set(false);
  }
  openDropdown() {
    this.isItemsDropDownOpen.set(true);
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
    }
    this.closeDropdown();
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
