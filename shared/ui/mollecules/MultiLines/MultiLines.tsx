import type { MultiLinesProps } from '../../../global/type'

const MultiLines = ({ text }: MultiLinesProps) => {
  return text.split('\n').map((l, i) => <div key={i}>{l}</div>)
}

export default MultiLines
