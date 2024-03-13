import React from 'react'

import type { SelectProps } from '../../../global/type'
import SelectOption from '../SelectOption/SelectOption'

const Select: React.FC<SelectProps> = ({
  options,
  children,
  selectClassName = '',
  defaultValue,
  onChange,
  ...props
}: SelectProps) => (
  <select
    className={`select rounded-xl bg-base-300 select-bordered text-secondary-content w-full font-bold ${selectClassName}`}
    defaultValue={defaultValue}
    onChange={onChange}
    {...props}
  >
    {options.map((option) => (
      <SelectOption key={option.value} value={option.value}>
        {option.label}
      </SelectOption>
    ))}
    {children}
  </select>
)

export default Select
