import { Component } from 'react'

import { BannerStatus } from '../../../global/enum'

type ReferralContainerProps = {
  children: React.ReactNode
  status: BannerStatus
}

const getBackgroundColor = (status: BannerStatus) => {
  switch (status) {
    case BannerStatus.Success:
      return 'bg-success bg-opacity-10 '
    case BannerStatus.Error:
      return 'bg-error bg-opacity-10 '
    case BannerStatus.Info:
      return 'bg-base-200'
  }
}

const getTextColor = (status: BannerStatus) => {
  switch (status) {
    case BannerStatus.Success:
      return 'text-success-content'
    case BannerStatus.Error:
      return 'text-error-content'
    case BannerStatus.Info:
      return 'text-secondary-content'
  }
}

class Banner extends Component<ReferralContainerProps> {
  render() {
    return (
      <div className={'flex rounded-xl w-full mb-4 ' + getBackgroundColor(this.props.status)}>
        <div className={'p-5 flex ' + getTextColor(this.props.status)}>{this.props.children}</div>
      </div>
    )
  }
}

export default Banner
