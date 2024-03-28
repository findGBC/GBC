import ReactGA from 'react-ga'

const useAnalyticsEventTracker = (category = 'Blog category') => {
  const eventTracker = (action = 'test action', label = 'test label') => {
    ReactGA.event({ action, category, label })
  }
  return eventTracker
}
export default useAnalyticsEventTracker
