import { useContext, useEffect } from 'react'

import { ThemeContext } from '../../../styles/themes/themeContext'

const LightToggle: React.FC = ({}) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('dark')
  }, [])

  return <button>Light Mode</button>
}

export default LightToggle
