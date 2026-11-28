'use client';

import Select, { components } from 'react-select';
import type { OptionProps } from 'react-select';
import { useField } from 'formik';
import css from './MultiSelect.module.css';

interface MultiSelectProps<T> {
  name: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
}

function CheckboxOption<T>(props: OptionProps<T, true>) {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
        className={css.checkbox}
      />

      {props.label}
    </components.Option>
  );
}

export default function MultiSelect<T>({
  name,
  options,
  valueKey,
  labelKey,
  placeholder = 'Оберіть значення',
}: MultiSelectProps<T>) {
  const [field, meta, helpers] = useField<string[]>(name);

  const hasError = meta.touched && Boolean(meta.error);

  const getValue = (option: T) => String(option[valueKey]);
  const getLabel = (option: T) => String(option[labelKey]);

  return (
    <Select<T, true>
      inputId={name}
      instanceId={name}
      className={`${css.select} ${hasError ? css.invalid : ''}`}
      classNamePrefix="multi-select"
      options={options}
      placeholder={placeholder}
      getOptionValue={getValue}
      getOptionLabel={getLabel}
      isMulti
      isSearchable={false}
      isClearable={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      maxMenuHeight={200}
      aria-invalid={hasError}
      components={{
        Option: CheckboxOption<T>,
        IndicatorSeparator: null,
      }}
      value={options.filter(option => field.value.includes(getValue(option)))}
      onChange={selected => helpers.setValue(selected.map(getValue))}
      onBlur={() => helpers.setTouched(true)}
    />
  );
}
