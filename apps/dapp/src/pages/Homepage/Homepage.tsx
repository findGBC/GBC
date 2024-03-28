import React from 'react'

import renctangle1 from '../../assets/img/homepage/Rectangle1.jpg'
import renctangle2 from '../../assets/img/homepage/Rectangle2.jpg'

import HomepageTile from './HomePageTile'
import HomepageTopPlayers from './HomepageTopPlayers'

const Homepage: React.FC = () => {
  return (
    <>
      <div className="layout animated fadeIn">
        <div className="flex flex-col w-full lg:flex-row gap-4 mb-5">
          <HomepageTile
            href="https://opensea.io/collection/findgbc"
            imageUrl={renctangle1}
            title="Join the club"
            text={'Step into the whirlwind of GBC where passion meets ambition.'}
          />
          <HomepageTile
            href="/lab"
            imageUrl={renctangle2}
            title="Blueberry Labs"
            text={'Set your PFP to unlock the full potential of GBC!'}
          />
        </div>
        <div className="lg:w-1/2">
          <HomepageTopPlayers />
        </div>
      </div>
    </>
  )
}
export default Homepage
