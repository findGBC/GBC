import { ReactSVG } from 'react-svg'

import { ButtonType } from '../../../global/enum'
import type { IGroupItem } from '../../../global/type'
import IconLabItemGroup from '../../../styles/icons/iconLabItemGroup'
import { Button } from '../../atoms'

type LabItemGroupsProps = {
  onGroupSelect: (group: IGroupItem) => void
  selectedGroup: IGroupItem
}

const LabItemGroups = ({ onGroupSelect, selectedGroup }: LabItemGroupsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {IconLabItemGroup.map((group) => (
        <Button
          key={group.id}
          btnType={ButtonType.Ghost}
          className={`h-full pr-7 pl-1 rounded-xl ${
            selectedGroup.id === group.id ? 'selected border border-secondary-content ' : ''
          }`}
          disabled={group.id === undefined}
          onClick={() => onGroupSelect(group)}
          border={selectedGroup.id === group.id}
        >
          <ReactSVG src={group.src} className="px-0" />
          <span className="text-white font-medium ml-[-15px]">{group.name}</span>
        </Button>
      ))}
    </div>
  )
}

export default LabItemGroups
