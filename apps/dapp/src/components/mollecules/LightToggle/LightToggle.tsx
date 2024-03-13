import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useContext, useEffect } from 'react'

import { ButtonType } from '../../../global/enum'
import { ThemeContext } from '../../../styles/themes/themeContext'
import { Button } from '../../atoms'

const LightToggle: React.FC = ({}) => {
  const { setTheme, theme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('dark')
  }, [])

  return <button>Light Mode</button>
}

export default LightToggle
