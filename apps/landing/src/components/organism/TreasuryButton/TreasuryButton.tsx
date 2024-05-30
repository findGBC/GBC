import React from 'react'
import CountUp from 'react-countup'

import treasuryIcon from '../../../assets/img/nav/wallet_icon.svg'
import { ButtonType } from '../../../global/enum'
import { useTreasuryDataProviderContext } from '../../../providers/TreasuryDataProvider'
import { Button } from '../../atoms'

type TreasuryButtonProps = {}

const TreasuryButton: React.FC<TreasuryButtonProps> = ({}) => {
  const { data } = useTreasuryDataProviderContext()

  return (
    <Button
      btnType={ButtonType.Ghost}
      url="/treasury"
      className="text-xs"
      border={true}
    >
      <img
        src={treasuryIcon}
        alt="Treasury"
        className="text-base-content w-4 mr-1"
      ></img>{' '}
      <CountUp end={data?.totalValue ?? 0} duration={1}></CountUp>
    </Button>
  )
}

export default TreasuryButton
