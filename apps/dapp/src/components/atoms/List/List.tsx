import type { IListProp } from '../../../global/type'

const List = (prop: IListProp): JSX.Element => <li {...prop}>{prop.children}</li>

export default List
