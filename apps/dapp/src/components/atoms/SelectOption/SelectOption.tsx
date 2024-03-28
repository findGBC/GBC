import type { ReactNode, OptionHTMLAttributes } from 'react'
import React from 'react'

interface SelectOptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children?: ReactNode
}

const SelectOption: React.FC<SelectOptionProps> = ({ children, ...props }: SelectOptionProps) => (
  <option {...props}>{children}</option>
)

export default SelectOption
