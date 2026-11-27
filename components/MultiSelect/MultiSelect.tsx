'use client';

import Select, { components } from 'react-select';
import type { OptionProps } from 'react-select';
import { useField } from 'formik';
import css from './MultiSelect.module.css';

export type SelectOption = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  name: string;
  options: SelectOption[];
  placeholder?: string;
}

const CheckboxOption = (props: OptionProps<SelectOption, true>) => {
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
};

export default function MultiSelect({
  name,
  options,
  placeholder = 'Оберіть значення',
}: MultiSelectProps) {
  const [field, meta, helpers] = useField<string[]>(name);

  const hasError = meta.touched && Boolean(meta.error);

  return (
    <Select<SelectOption, true>
      inputId={name}
      instanceId={name}
      className={`${css.select} ${hasError ? css.invalid : ''}`}
      classNamePrefix="multi-select"
      options={options}
      placeholder={placeholder}
      isMulti
      isSearchable={false}
      isClearable={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      maxMenuHeight={200}
      aria-invalid={hasError}
      components={{
        Option: CheckboxOption,
        IndicatorSeparator: null,
      }}
      value={options.filter(option => field.value.includes(option.value))}
      onChange={selected =>
        helpers.setValue(selected.map(option => option.value))
      }
      onBlur={() => helpers.setTouched(true)}
    />
  );
}
