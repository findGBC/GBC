import { useAccount } from 'wagmi'

import leaderboardIcon from '../../assets/img/icons/icon2_leaderboard.svg'
import statsIcon from '../../assets/img/icons/icon2_stats.svg'
import { Loader } from '../../components/mollecules'
import { LeaderboardCountDown } from '../../components/organism'
import LeaderboardTable from '../../components/organism/Leaderboard/LeaderboardTable'
import Title from '../../components/organism/Title/Title'
import { formatReadableUSD } from '../../global/gmx-middleware/utils'
import { numberWithCommas } from '../../global/middleware'
import useCompetition from '../../hooks/useCompetition'
import ReferralBanner from '../Homepage/ReferralBanner'

import Rules from './Rules'

const GbcTrading: React.FC = ({}) => {
  const { address } = useAccount()
  const { leaderboard, schedule, currentMetric, isLoading } = useCompetition(address!)

  if (isLoading) {
    return <Loader />
  }

  if (leaderboard?.profile) {
    leaderboard.sortedCompetitionList = leaderboard.sortedCompetitionList.filter(
      (trader) => trader.account !== leaderboard.profile?.account,
    )
    leaderboard?.sortedCompetitionList?.unshift(leaderboard.profile!)
  }

  return (
    <div className="layout small thin ">
      <ReferralBanner account={address!} />
      <div className="flex gap-8 flex-col md:flex-row">
        <div className="md:w-3/4 mb-5 leading-10 items-center justify-between order-2 md:order-1">
          <div className="flex mb-5 justify-between ">
            <Title
              icon={leaderboardIcon}
              title="Leaderboard"
              subtitle={'(Highest ' + (currentMetric === 'pnl' ? 'PNL' : 'ROI') + ')'}
            />
            <div className="ml-5">
              <LeaderboardCountDown schedule={schedule} />
            </div>
          </div>
          <div className="">
            <LeaderboardTable
              traders={leaderboard?.sortedCompetitionList}
              metrics={leaderboard?.metrics}
              totalScore={leaderboard?.totalScore}
              currentMetric={currentMetric}
            />
          </div>
        </div>
        <div className="md:w-1/4 mb-5 leading-10 items-center justify-between md:order-2 ">
          <Title icon={statsIcon} title="Competitions Stats" />
          <div className="bg-base-100 rounded-xl p-8 mb-6 text-neutral leading-6">
            <div className="font-extralight">Total Traded Volume</div>
            <div className="font-bold text-2xl text-secondary-content">
              {numberWithCommas(formatReadableUSD(leaderboard?.metrics.estSize ?? BigInt(0)))}
            </div>
            <div className="font-extralight">Current Prize Pool</div>
            <div className="font-bold text-2xl text-success-content">
              {numberWithCommas(formatReadableUSD(leaderboard?.metrics.feePool ?? BigInt(0)))}
            </div>
            <div className="font-extralight">Estimated Prize Pool</div>
            <div className="font-bold text-2xl text-success-content">
              {numberWithCommas(formatReadableUSD(leaderboard?.metrics.estFeePool ?? BigInt(0)))}
            </div>
          </div>

          <Rules />
        </div>
      </div>
    </div>
  )
}

export default GbcTrading
