'use client';

import Select, { components } from 'react-select';
import type { MenuListProps, OptionProps } from 'react-select';
import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import css from './MultiSelect.module.css';

interface MultiSelectProps<T> {
  name: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

interface InfiniteSelectProps {
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
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

function InfiniteMenuList<T>(props: MenuListProps<T, true>) {
  const { children, selectProps, ...menuListProps } = props;
  const { hasNextPage, onLoadMore, isLoadingMore } = selectProps as typeof selectProps & InfiniteSelectProps;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    const root = target?.parentElement;

    if (!target || !root || !hasNextPage || !onLoadMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          onLoadMore();
        }
      },
      { root, rootMargin: '40px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isLoadingMore, onLoadMore]);

  return (
    <components.MenuList {...menuListProps} selectProps={selectProps}>
      {children}
      {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}
    </components.MenuList>
  );
}

export default function MultiSelect<T>({
  name,
  options,
  valueKey,
  labelKey,
  placeholder = 'Оберіть значення',
  hasNextPage = false,
  onLoadMore,
  isLoading = false,
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
      {...({
        hasNextPage,
        onLoadMore,
        isLoadingMore: isLoading,
      } satisfies InfiniteSelectProps)}
      placeholder={placeholder}
      getOptionValue={getValue}
      getOptionLabel={getLabel}
      isMulti
      isSearchable={false}
      isClearable={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      maxMenuHeight={200}
      isLoading={isLoading}
      aria-invalid={hasError}
      components={{
        Option: CheckboxOption<T>,
        MenuList: InfiniteMenuList,
        IndicatorSeparator: null,
      }}
      value={options.filter(option => field.value.includes(getValue(option)))}
      onChange={selected => helpers.setValue(selected.map(getValue))}
      onBlur={() => helpers.setTouched(true)}
    />
  );
}
