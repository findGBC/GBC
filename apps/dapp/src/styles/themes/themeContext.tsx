import React, { createContext, useMemo, useState } from 'react'

import useCustomEffect from '../../hooks/useCustomEffect'

export interface ThemeContextProps {
  theme: string
  setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  setTheme: () => {},
  theme: 'default',
})

/**
 * Theme Context Provider.
 *
 * @param value string
 * @param children ReactNode
 * @returns ReactNode
 */
export const ThemeContextProvider = ({
  value = 'default',
  children,
}: {
  value?: string
  children: React.ReactNode
}) => {
  const [theme, setTheme] = useState(value)

  useCustomEffect(() => {
    const storeTheme = localStorage.getItem('theme')
    applyTheme(storeTheme || 'default')
  }, [])

  /**
   * Apply theme to 'html' tag on DOM.
   */
  const applyTheme = (theme = 'dark') => {
    const newTheme = theme
    const html = document.getElementsByTagName('html')[0]
    localStorage.setItem('theme', theme)
    ;(html as any).setAttribute('data-theme', newTheme)
  }

  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    applyTheme(theme)
  }

  /**
   * Current context value for theme.
   */
  const val = useMemo(
    () => ({
      setTheme: handleThemeChange,
      theme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>
}
