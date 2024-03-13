import Countdown from 'react-countdown'

import type { ICompetitionSchedule } from '../../../global/middleware'

type LeaderboardCountDownProps = {
  schedule: ICompetitionSchedule
}

const renderCountDown = ({ hours, minutes, days, completed }: any) => {
  if (completed) {
    return null
  } else {
    return (
      <div className="flex align-middle font-bold border-base-200 border-2 rounded-xl p-2 text-xs text-secondary-content">
        <div className="">
          <span className="relative flex h-2 w-2 m-1 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
          </span>
        </div>

        <div>
          {days}d {hours}h {minutes}m
        </div>
      </div>
    )
  }
}

const LeaderboardCountDown = ({ schedule }: LeaderboardCountDownProps) => {
  const date = schedule.ended ? schedule.next : schedule.end

  return <Countdown date={new Date(date * 1000)} renderer={renderCountDown} />
}

export default LeaderboardCountDown
