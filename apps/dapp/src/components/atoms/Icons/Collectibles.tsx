import type { IconProps } from '../../../global/type'

interface CollectiblesProps extends IconProps {
  color?: string
  width?: number
  height?: number
}

const Collectibles = ({ color = 'white', width = 18, height = 18 }: CollectiblesProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.7275 9.1875V12.5625C12.7275 15.375 11.6025 16.5 8.79004 16.5H5.41504C2.60254 16.5 1.47754 15.375 1.47754 12.5625V9.1875C1.47754 6.375 2.60254 5.25 5.41504 5.25H8.79004C11.6025 5.25 12.7275 6.375 12.7275 9.1875Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4775 4.3875V6.8625C16.4775 8.925 15.6525 9.75 13.59 9.75H12.7275V9.1875C12.7275 6.375 11.6025 5.25 8.79004 5.25H8.22754V4.3875C8.22754 2.325 9.05254 1.5 11.115 1.5H13.59C15.6525 1.5 16.4775 2.325 16.4775 4.3875Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Collectibles
