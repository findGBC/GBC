import CountUp from 'react-countup'

import { Constants } from '../../../global/constant'
import type { VotersProps } from '../../../global/type'

const Voters = ({ ipfs, total }: VotersProps) => {
  return (
    <div className="avatar-group -space-x-6">
      {ipfs?.map((v: string, i: number) => (
        <div className="avatar" key={i}>
          <div className="w-12">
            <img
              className="w-2"
              src={`${Constants.URL.SNAPSHOT.AVATAR}${v}?s=36`}
              alt={v}
            ></img>
          </div>
        </div>
      )) ?? <></>}
      <div className="avatar placeholder z-30">
        <div className="bg-base-300 text-base-content w-12">
          <span>
            <CountUp end={total} duration={5}></CountUp>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Voters
