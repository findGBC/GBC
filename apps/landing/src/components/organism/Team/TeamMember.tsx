import { Link } from 'react-router-dom'

import { isValidUrl } from '../../../global/helpers'
import type { TeamMemberProps } from '../../../global/type'
import { useI18nContext } from '../../../i18n/i18n-react'
import CardContainer from '../CardContainer/CardContainer'

const TeamMember = ({ id, name, jobs, img, socialLink }: TeamMemberProps) => {
  const { LL } = useI18nContext()
  return (
    <div className="md:w-1/3 w-full" key={id.toString()}>
      <Link
        to={socialLink}
        target={isValidUrl(socialLink) ? '_blank' : undefined}
      >
        <CardContainer className="card-side md:mx-auto mx-5">
          <figure className="w-40 p-3">
            <img
              src={
                new URL(`../../../assets/img/team/${img}.jpg`, import.meta.url)
                  .href
              }
              alt={name}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body md:pl-1 w-full pl-3">
            <h2 className="card-title text-secondary-content md:text-xl items-start">
              {name}
            </h2>
            <div className="md:text-base">
              {jobs
                .map((job) => {
                  return LL.TEAM.JOB({ job: job })
                })
                .join(' | ')}
            </div>
          </div>
        </CardContainer>
      </Link>
    </div>
  )
}

export default TeamMember
