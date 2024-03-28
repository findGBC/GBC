import { getKey } from '../../../global/helpers'

type SliderProps = {
  urls: string[]
  reverse: boolean
}

function getTrackClasses(reverse: boolean) {
  return `slide-track ${reverse ? 'reverse' : ''}`
}

const getImageUrl = (path: string) => {
  return new URL(`../../../assets/img/berries/${path}.jpg`, import.meta.url)
    .href
}

const Slider: React.FC<SliderProps> = ({ urls, reverse }) => {
  return (
    <>
      <div className="slider">
        <div className={getTrackClasses(reverse)}>
          {urls.map((url) => (
            <div className="slide" key={getKey(url)}>
              <img
                src={getImageUrl(url)}
                alt={url}
                className="max-w-[12rem] md:max-w-[14rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Slider
