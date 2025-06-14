import { Component, computed, input, model, signal, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ngx-select-zigzag',
  imports: [],
  templateUrl: './ngx-select-zigzag.html',
  styleUrl: './ngx-select-zigzag.scss'
})
export class NgxSelectZigzag implements ControlValueAccessor{
  options = input<SelectorOption[]>([]);
  labelKey = input<string | undefined>();
  valueKey = input<string | undefined>();
  multiple = input<boolean>(false);
  placeholder = input<string>('Select...');
  optionTemplate = input<TemplateRef<any>>();

  value = model<SelectorValue | undefined>(undefined);
  multiValue = model<SelectorValue[]>([]);

  isOpen = signal(false);

  optionValueToOption = computed<Map<SelectorValue,SelectorOption>>(()=>{
    const res = new Map<SelectorValue,SelectorOption>();
    for(const option of this.options()){
      const optionVal = this.getOptionValue(option);
      res.set(optionVal,option);
    }
    return res;
  });

  selectedOptions = computed(()=>{
    const multiValue = this.multiValue();
    if(multiValue.length > 0){
      return multiValue.map(val=>{
        return this.optionValueToOption().get(val);
      })
    }
    //return this.multiValue().map(v => this.getOptionLabel(v)).join(', ');
  })

  selectedOption = computed(()=>{
    const val = this.value();
    if(val == null){
      return undefined;
    }
    return this.optionValueToOption().get(val);
  });
  selectedOptionLabel = computed(()=>{
    const val = this.selectedOption();
    if(val == null){
      return undefined;
    }
    return this.getOptionLabel(val);
  });

  private onChange = (_: SelectorValue | undefined) => {};
  private onTouched = () => {};

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(option: SelectorOption) {
    const optionVal = this.getOptionValue(option);
    if (this.multiple()) {
      const exists = this.multiValue().includes(optionVal);
      if(exists){
        this.value.set(this.multiValue().filter((v: SelectorValue) => v !== optionVal));
      }
      else {
        this.value.set([...this.multiValue(), optionVal]);
      }
      this.onChange(this.multiValue());
    } else {
      this.value.set(optionVal);
      this.isOpen.set(false);
      this.onChange(this.value());
    }
  }

  isSelected(option: SelectorValue): boolean {
    const optValue = this.getOptionValue(option);
    return this.multiple()
      ? this.multiValue().includes(optValue)
      : this.value === optValue;
  }

  getOptionValue(option: SelectorOption): SelectorValue {
    return this.valueKey() ? option[this.valueKey() as keyof object] : option;
  }
  getOptionLabel(option: SelectorOption): string {
    return this.labelKey() ? option[this.labelKey() as keyof object] : option as string;
  }

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
type SelectorValue = string | number | object | boolean;
type SelectorOption = string | number | object | boolean;
