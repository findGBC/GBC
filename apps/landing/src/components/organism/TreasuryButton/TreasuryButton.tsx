import { useEffect, useState } from 'react'
import CountUp from 'react-countup'

import treasuryIcon from '../../../assets/img/nav/wallet_icon.svg'
import { ButtonType } from '../../../global/enum'
import useNansen from '../../../hooks/useNansen'
import { Button } from '../../atoms'

type TreasuryButtonProps = {}

const TreasuryButton: React.FC<TreasuryButtonProps> = ({}) => {
  const [treasury, setTreasury] = useState<number>()
  const { assets } = useNansen()

  useEffect(() => {
    let amount = 0
    assets.map((a) => {
      amount += a.balance * a.price
    })

    setTreasury(amount)
  }, [assets])

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
      <CountUp end={treasury ?? 0} duration={1}></CountUp>
    </Button>
  )
}

export default TreasuryButton
