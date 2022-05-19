import { FormGroup, ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  name: string;
  type: string;
  disabled?: boolean;
  label?: string;
  options?: any[];
  selected?: any[];
  placeholder?: string;
  validation?: ValidatorFn[];
  value?: any;
  containerClass?: string;
}

export interface Field {
  config: FieldConfig;
  group: FormGroup;
  class: string;
}
