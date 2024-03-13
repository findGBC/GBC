import type { IListProp } from '../../../global/type'

const Select = (prop: IListProp): JSX.Element => (
  <option {...prop}>{prop.children}</option>
)

export default Select
