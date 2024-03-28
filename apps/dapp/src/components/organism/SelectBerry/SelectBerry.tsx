import type { IToken } from '../../../global/middleware'
import type { SelectOptionProps } from '../../../global/type'
import { Select } from '../../atoms'

type SelectBerryProps = {
  ownedTokens: IToken[] | undefined
  selectedBerry: string
  onSelectBerry: (berryId: string) => void
  className?: string
}

const SelectBerry = ({
  ownedTokens,
  selectedBerry,
  onSelectBerry,
  className,
}: SelectBerryProps) => {
  const getOptions = (tokens: IToken[] | undefined): SelectOptionProps[] => {
    if (tokens) {
      return tokens.map((token: IToken) => {
        return {
          label: `GBC #${parseInt(token.id.toString(), 16)}`,
          value: token.id.toString(),
        } as SelectOptionProps
      })
    }
    return [] as { value: string; label: string }[]
  }

  return (
    <Select
      options={getOptions(ownedTokens)}
      selectClassName={className}
      value={'0x' + BigInt(selectedBerry).toString(16)}
      onChange={(e) => onSelectBerry(e.target.value)}
    />
  )
}

export default SelectBerry
