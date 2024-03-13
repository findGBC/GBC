import type { ChangeEventHandler } from 'react'

type TextInputProps = {
  value: string
  onChange: ChangeEventHandler
  placeholder?: string
  className?: string
  type?: string
}

const TextInput = ({ value, onChange, ...props }: TextInputProps) => {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      type="text"
      className="input input-bordered w-full max-w-xs"
    />
  )
}
export default TextInput
