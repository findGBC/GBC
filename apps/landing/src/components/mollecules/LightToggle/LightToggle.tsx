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

  return (
    <Button
      btnType={ButtonType.Ghost}
      border={true}
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
    >
      {theme == 'dark' ? (
        <SunIcon width={20}></SunIcon>
      ) : (
        <MoonIcon width={20}></MoonIcon>
      )}
    </Button>
  )
}

export default LightToggle
