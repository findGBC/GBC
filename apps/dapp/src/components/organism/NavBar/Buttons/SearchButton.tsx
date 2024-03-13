import { SearchIcon } from '@heroicons/react/outline'

import { ButtonType } from '../../../../global/enum'
import { Button } from '../../../atoms'

type SearchButtonProps = {
  isOpen: boolean
  onClick: () => void
}
const SearchButton = ({ isOpen, onClick }: SearchButtonProps) => {
  return (
    <Button btnType={ButtonType.Ghost} className="px-3 md:block" onClick={onClick}>
      <div className="flex items-center">
        <div className="w-6 h-6">
          <SearchIcon className={isOpen ? 'text-accent' : ''}></SearchIcon>
        </div>
      </div>
    </Button>
  )
}

export default SearchButton
