import { useEffect, useState } from 'react'
import { localStorageDetector } from 'typesafe-i18n/detectors'

import TypesafeI18n from '../i18n/i18n-react'
import { detectLocale } from '../i18n/i18n-util'
import { loadLocaleAsync } from '../i18n/i18n-util.async'

import GbcRoutes from './routes'

import 'animate.css/animate.compat.css'
import 'animate.css/animate.css'

import { useLocation } from 'react-router-dom';

 import ReactGA from 'react-ga';
  const TRACKING_ID = "G-N9ZSKGTK2Z";
  ReactGA.initialize(TRACKING_ID);

const detectedLocale = detectLocale(localStorageDetector)
const App = () => {
  const location = useLocation();
  const [wasLoaded, setWasLoaded] = useState(false)

  useEffect(() => {
    loadLocaleAsync(detectedLocale).then(() => setWasLoaded(true))
  }, [])

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  if (!wasLoaded) return null

  return (
    <TypesafeI18n locale={detectedLocale}>
      <GbcRoutes />
    </TypesafeI18n>
  )
}

export default App
