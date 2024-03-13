type TitleProps = {
  icon: string
  title: string
  subtitle?: string
}

const Title = ({ icon, title, subtitle }: TitleProps) => {
  return (
    <div className="flex mb-3">
      <div>
        <img src={icon} alt="leaderboard" className="w-10 mr-3" />
      </div>
      <div className="font-bold text-secondary-content flex flex-col sm:flex-row">
        {title} {subtitle ? <span className="text-primary sm:ml-3">{subtitle}</span> : null}
      </div>
    </div>
  )
}

export default Title
