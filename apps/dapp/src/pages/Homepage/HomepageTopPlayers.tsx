import { useAccount } from 'wagmi'

import tradeIcon from '../../assets/img/icons/icon2_trade.svg'
import { Loader } from '../../components/mollecules'
import { LeaderboardCountDown } from '../../components/organism'
import LightLeaderboardTable from '../../components/organism/Leaderboard/LightLeaderboardTable'
import useCompetition from '../../hooks/useCompetition'

const HomepageTopPlayers = () => {
  const { address } = useAccount()
  const { schedule, leaderboard, isLoading, currentMetric } = useCompetition(address)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="grid my-4">
      <div className="flex mb-5 leading-10 items-center justify-between">
        <div className="flex">
          <img src={tradeIcon} alt="leaderboard" className="w-10 mr-2" />
          <div className="inline-block font-bold">Trading Top Players</div>
        </div>
        <LeaderboardCountDown schedule={schedule} />
      </div>
      <LightLeaderboardTable
        traders={leaderboard?.sortedCompetitionList}
        metrics={leaderboard?.metrics}
        totalScore={leaderboard?.totalScore}
        currentMetric={currentMetric}
      />
    </div>
  )
}

export default HomepageTopPlayers
