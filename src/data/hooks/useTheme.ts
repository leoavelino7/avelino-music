import { useEffect, useState } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

const localStorageKey = '@app/theme'

export function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState(window.localStorage.getItem(localStorageKey) || Theme.DARK)

  useEffect(() => {
    if (theme === Theme.DARK || (!(localStorageKey in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add(Theme.DARK)
    } else {
      document.documentElement.classList.remove(Theme.DARK)
    }
  }, [theme])

  function toggleTheme(): void {
    const selectedTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    window.localStorage.setItem('@app/theme', selectedTheme)
    setTheme(selectedTheme)
  }

  return [theme, toggleTheme]
}
